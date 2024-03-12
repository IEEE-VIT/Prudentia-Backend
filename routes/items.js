const express = require("express");
const router = express.Router();
const axios = require("axios");
const getType = require("../utils/getType");

const Collection = require("../models/collections");
const Item = require("../models/items");

router.get("/:collectionId", async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const collection = await Collection.findByPk(collectionId);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    if (collection.ownerEmail !== req.user.email && !collection.isPublic) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const itemData = await Item.findAll({
      where: { collectionId },
    });

    res.status(200).json(itemData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { collectionId, url } = req.body;

    const collection = await Collection.findByPk(collectionId);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    if (collection.ownerEmail !== req.user.email) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const response = await axios.get(`${process.env.LINKPREVIEW_API_URL}?q=${url}`, {
      headers: {
        "X-Linkpreview-Api-Key": process.env.LINKPREVIEW_API_KEY,
      },
    });

    const { title, description, image } = response.data;
    const type = getType(url);

    const newItem = await Item.create({
      collectionId,
      url,
      title,
      description,
      image,
      type,
    });

    await Collection.increment('count', { where: { id: collectionId } });

    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const collectionId = item.collectionId;
    const collection = await Collection.findByPk(collectionId);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    if (collection.ownerEmail !== req.user.email) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Item.destroy({ where: { id: itemId } });

    await Collection.decrement('count', { where: { id: collectionId } });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
