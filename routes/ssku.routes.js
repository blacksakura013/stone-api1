const express = require("express");
const { readJson, writeJson } = require("../utils/fileDb");

const router = express.Router();
const FILE = "sskus.json";

/**
 * GET all SSKU
 */
router.get("/", (req, res) => {
  res.json(readJson(FILE));
});

/**
 * POST create SSKU (Stone Inventory Detail)
 */
router.post("/", (req, res) => {
  const sskus = readJson(FILE);

  const ssku = {
    id: `SSKU-${String(sskus.length + 1).padStart(4, "0")}`,
    stone: req.body.stone,
    stoneid: Number(req.body.stoneid),

    shape: req.body.shape || "-",
    shapeid: req.body.shapeid || 0,
    cut: req.body.cut || "-",
    cutid: req.body.cutid || 0,
    clarity: req.body.clarity || "-",
    clarityid: req.body.clarityid || 0,
    color: req.body.color || "-",
    colorid: req.body.colorid || 0,
    quality: req.body.quality || "-",
    qualityid: req.body.qualityid || 0,
    size: req.body.size || "-",
    sizeid: req.body.sizeid || 0,
    setting: req.body.setting || "-",
    settingid: req.body.settingid || 0,
    certificate: req.body.certificate || "",
    lab: req.body.lab || "",
    labid: req.body.labid || 0,
    pcs: req.body.pcs || 0,
    weight: req.body.weight || "0.000"
  };

  sskus.push(ssku);
  writeJson(FILE, sskus);

  res.status(201).json(ssku);
});

module.exports = router;
