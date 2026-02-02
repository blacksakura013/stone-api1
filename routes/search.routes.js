const express = require("express");
const { readJson } = require("../utils/fileDb");

const router = express.Router();

router.get("/stone", (req, res) => {
  const { search } = req.query;
  const keyword = search ? String(search).toLowerCase() : null;

  const limit = Math.max(1, Number(req.query.limit) || 20);
  const offset = Math.max(0, Number(req.query.offset) || 0);

  const stones = readJson("stones.json");
  const sskus = readJson("sskus.json");

  const merged = [];
  const stoneHasSSKU = new Set();

  /* =====================
     1️⃣ MERGE : SSKU + Stone
  ===================== */
  sskus.forEach(ssku => {
    const stone = stones.find(st => st.id === ssku.stoneid);
    if (!stone) return;

    stoneHasSSKU.add(stone.id);
    merged.push(buildResult(stone, ssku));
  });

  /* =====================
     2️⃣ MERGE : Stone without SSKU
  ===================== */
  stones.forEach(stone => {
    if (stoneHasSSKU.has(stone.id)) return;
    merged.push(buildResult(stone, null));
  });

  /* =====================
     3️⃣ SEARCH (%LIKE%)
  ===================== */
  let filtered = merged;

  if (keyword) {
    filtered = merged.filter(item =>
      item.stone?.toLowerCase().includes(keyword) ||
      item.ssku?.toLowerCase().includes(keyword)
    );
  }

  /* =====================
     4️⃣ PAGINATION
  ===================== */
  const paged = filtered.slice(offset, offset + limit);

  res.json({
    total: filtered.length,
    limit,
    offset,
    data: paged
  });
});

/* =====================
   helper
===================== */
function buildResult(stone, ssku) {
  if (!ssku) {
    return {
      stone: stone.name,
      stoneid: stone.id,
      ssku: "-",

      shape: "-",
      shapeid: 0,
      cut: "-",
      cutid: 0,
      clarity: "-",
      clarityid: 0,
      color: "-",
      colorid: 0,
      quality: "-",
      qualityid: 0,
      size: "-",
      sizeid: 0,
      setting: "-",
      settingid: 0,
      certificate: "",
      lab: "",
      labid: 0,
      pcs: 0,
      weight: "0.000"
    };
  }

  return {
    stone: stone.name,
    stoneid: stone.id,
    ssku: ssku.id,

    shape: ssku.shape,
    shapeid: ssku.shapeid,
    cut: ssku.cut,
    cutid: ssku.cutid,
    clarity: ssku.clarity,
    clarityid: ssku.clarityid,
    color: ssku.color,
    colorid: ssku.colorid,
    quality: ssku.quality,
    qualityid: ssku.qualityid,
    size: ssku.size,
    sizeid: ssku.sizeid,
    setting: ssku.setting,
    settingid: ssku.settingid,
    certificate: ssku.certificate,
    lab: ssku.lab,
    labid: ssku.labid,
    pcs: ssku.pcs,
    weight: ssku.weight
  };
}

module.exports = router;
