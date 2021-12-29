const fs = require('fs/promises');
const path = require('path');

const readFile = async (fileName, encoding, options = null) => {
  const dir = path.join(__dirname, '../', fileName);
  const data = await fs.readFile(dir, encoding, options);
  return data;
};

module.exports = { readFile };