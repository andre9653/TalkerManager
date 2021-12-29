const DB = './talker.json';
const fs = require('fs/promises');
const { readFile } = require('../utils');
const { HTTP_OK_STATUS } = require('../utils/constant');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await readFile('talker.json', 'utf8');
    const parsing = JSON.parse(talker);
    const data = parsing.filter((user) => Number(id) !== user.id);
    const talkersEdit = [...data];
    await fs.writeFile(DB, JSON.stringify(talkersEdit));
    return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteTalker;