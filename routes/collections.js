const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const Collections = require("../models/collections");

router.get("/", async (req, res) => {
  try {
    const collectionData = await Collections.find({
      ownerEmail: req.user.email,
    });
    res.status(200).json(collectionData);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const collectionId = new sequelize.ObjectID(req.params.id);
    const collectionData = await Collections.findById(collectionId);
    if (
      collectionData.ownerEmail !== req.user.email &&
      !collectionData.isPublic
    ) {
      return res.status(200).json({ private: true });
    }
    res.status(200).json(collectionData);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const collection = new Collections({
    name: req.body.name,
    ownerEmail: req.user.email,
  });

  try {
    const newCollection = await collection.save();
    res.status(200).json(newCollection);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const collectionId = new sequelize.ObjectID(req.params.id);
    const collection = await Collections.findById(collectionId);
    if (collection.ownerEmail !== req.user.email) {
      return res.json({ error: "Unauthorized" });
    }
    collection.name = req.body.name;
    const updatedCollection = await collection.save();
    res.status(200).json(updatedCollection);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/changeVisibility", async (req, res) => {
  try {
    const collectionId = new mongodb.ObjectID(req.body.id);
    const collection = await Collections.findById(collectionId);
    if (collection.ownerEmail !== req.user.email) {
      return res.json({ error: "Unauthorized" });
    }
    collection.isPublic = !collection.isPublic;
    const updatedCollection = await collection.save();
    res.status(200).json(updatedCollection);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const collectionId = new mongodb.ObjectID(req.params.id);
    const collection = await Collections.findById(collectionId);
    if (collection.ownerEmail !== req.user.email) {
      return res.json({ error: "Unauthorized" });
    }
    await Collections.deleteOne({ _id: collectionId });
    res.status(200).json(collection);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;