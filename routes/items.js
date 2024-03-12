const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const axios = require("axios");
const getType = require("../utils/getType");

const Collections = require("../models/collections");
const Items = require("../models/items");

router.get("/:collectionId", async (req, res) => {
  try {
    const collectionId = new sequelize.ObjectID(req.params.collectionId);
    const collection = await Collections.findById(collectionId);
    if (collection.ownerEmail !== req.user.email && !collection.isPublic) {
      return res.status(200).json({ private: true });
    }
    const itemData = await Items.find({
      collectionId: req.params.collectionId,
    });
    res.status(200).json(itemData);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const collectionId = req.body.collectionId;
    const url = req.body.url;

    const collection = await Collections.findById(
      new sequelize.ObjectID(collectionId)
    );

    if (collection.ownerEmail !== req.user.email) {
      return res.json({ error: "Unauthorized" });
    }

    const response = await axios
      .get(`${process.env.LINKPREVIEW_API_URL}?q=${url}`, {
        headers: {
          "X-Linkpreview-Api-Key": process.env.LINKPREVIEW_API_KEY,
        },
      })
      .catch((error) => {
        return {
          data: {
            title: "",
            description: "",
            image: "",
          },
        };
      });

    const title = response.data.title;
    const description = response.data.description;
    const image = response.data.image;
    const type = getType(url);

    const item = new Items({
      collectionId: collectionId,
      url: url,
      title: title,
      description: description,
      image: image,
      type: type,
    });
    const newItem = await item.save();

    await Collections.updateOne(
      { _id: new mongodb.ObjectID(collectionId) },
      { $inc: { count: 1 } }
    );

    res.status(200).json(newItem);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = new sequelize.ObjectID(req.params.id);
    const item = await Items.findById(itemId);
    const collectionId = new sequelize.ObjectID(item.collectionId);
    const collection = await Collections.findById(collectionId);
    if (collection.ownerEmail !== req.user.email) {
      return res.json({ error: "Unauthorized" });
    }
    await Items.deleteOne({ _id: itemId });

    await Collections.updateOne(
      { _id: new sequelize.ObjectID(collectionId) },
      { $inc: { count: -1 } }
    );

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;