const { readFile } = require('../utils');
const { HTTP_OK_STATUS } = require('../utils/constant');

const searchTalker = async (req, res) => {
  const { q } = req.query;
  try {
    const talker = await readFile('talker.json', 'utf8');
    const parsing = JSON.parse(talker);
    const data = parsing.filter((user) => user.name.includes(q));
    return res.status(HTTP_OK_STATUS).json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = searchTalker;