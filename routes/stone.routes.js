const express = require("express");
const { readJson, writeJson } = require("../utils/fileDb");

const router = express.Router();
const FILE = "stones.json";

/**
 * GET all stones
 */
router.get("/", (req, res) => {
  res.json(readJson(FILE));
});

/**
 * POST create stone (numeric id)
 */
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "name required" });

  const stones = readJson(FILE);
  const maxId = stones.reduce((m, s) => Math.max(m, Number(s.id)), 0);

  const stone = {
    id: maxId + 1,
    name
  };

  stones.push(stone);
  writeJson(FILE, stones);

  res.status(201).json(stone);
});

module.exports = router;
