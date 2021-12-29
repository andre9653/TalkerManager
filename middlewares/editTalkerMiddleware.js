const DB = './talker.json';
const fs = require('fs/promises');
const { readFile } = require('../utils');
const { HTTP_OK_STATUS } = require('../utils/constant');

const edit = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  try {
    const talker = await readFile('talker.json', 'utf8');
    const userAdd = {
      id: Number(id),
      name,
      age,
      talk, 
    };
    const parsing = JSON.parse(talker);
    const data = parsing.filter((user) => userAdd.id !== user.id);
    const talkersEdit = [...data, userAdd];
    await fs.writeFile(DB, JSON.stringify(talkersEdit));
    return res.status(HTTP_OK_STATUS).json(userAdd);
  } catch (err) {
    console.log(err);
  }
};

module.exports = edit;