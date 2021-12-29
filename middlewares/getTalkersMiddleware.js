const DB = './talker.json';
const fs = require('fs/promises');
const { HTTP_OK_STATUS } = require('../utils/constant');

const getTalkersMiddleware = async (req, res) => {
  const talker = await fs.readFile(DB, 'utf8');
  const data = JSON.parse(talker);
  res.status(HTTP_OK_STATUS).json(data || []);
};

module.exports = getTalkersMiddleware;