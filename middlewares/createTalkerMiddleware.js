const fs = require('fs').promises;
const { HTTP_REQ_OK } = require('../utils/constant');

const cadastro = async (req, res) => {
  const { name, age, talk } = req.body;
  try {
    const talker = await fs.readFile('./talker.json');
    const data = JSON.parse(talker);
    const userAdd = {
      id: 5,
      name,
      age,
      talk, 
    };
    data.push(userAdd);
    await fs.writeFile('./talker.json', JSON.stringify(data, null, 2), { flag: 'w+' });
    return res.status(HTTP_REQ_OK).json(userAdd);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  cadastro,
};
