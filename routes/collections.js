const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Collection } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.send("Testing collections base url");
    const collectionData = await Collection.findAll({
      where: { ownerEmail: req.user.email },
    });
    res.status(200).json(collectionData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.send("Testing collections base / id");
    const collectionData = await Collection.findOne({
      where: {
        id: req.params.id,
        [Op.or]: [
          { ownerEmail: req.user.email },
          { isPublic: true }
        ]
      },
    });
    if (!collectionData) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json(collectionData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCollection = await Collection.create({
      name: req.body.name,
      ownerEmail: req.user.email,
    });
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [updatedRowsCount] = await Collection.update(
      { name: req.body.name },
      {
        where: {
          id: req.params.id,
          ownerEmail: req.user.email,
        },
      }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Collection not found or unauthorized" });
    }
    res.status(200).json({ message: "Collection updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/changeVisibility", async (req, res) => {
  try {
    const [updatedRowsCount] = await Collection.update(
      { isPublic: req.body.isPublic },
      {
        where: {
          id: req.body.id,
          ownerEmail: req.user.email,
        },
      }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Collection not found or unauthorized" });
    }
    res.status(200).json({ message: "Visibility updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRowsCount = await Collection.destroy({
      where: {
        id: req.params.id,
        ownerEmail: req.user.email,
      },
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "Collection not found or unauthorized" });
    }
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
