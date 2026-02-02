const fs = require("fs");
const path = require("path");

const readJson = (file) => {
  const filePath = path.join(__dirname, "..", "data", file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath));
};

const writeJson = (file, data) => {
  const filePath = path.join(__dirname, "..", "data", file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJson, writeJson };
