const DB = './talker.json';
const fs = require('fs/promises');
const { HTTP_NOT_FOUND_STATUS, HTTP_OK_STATUS } = require('../utils/constant');

const getTalkersByIdMiddleware = async (req, res) => {
  const { id } = req.params;

  const talkersString = JSON.parse(await fs.readFile(DB, 'utf8'));

  const talkers = talkersString.find((talker) => talker.id === parseInt(id, 10));
  if (!talkers) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = getTalkersByIdMiddleware;