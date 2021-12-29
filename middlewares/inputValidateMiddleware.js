const { HTTP_ERRO_STATUS } = require('../utils/constant');

const validateInputName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_ERRO_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_ERRO_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
  next();
};

const validateInputAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_ERRO_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_ERRO_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const isInterval = (num1, num2, num3) => num1 < num2 || num1 > num3;

const validateInputTalk = (req, res, next) => {
  const { talk } = req.body;
  const talkIsValid = talk && Object.keys(talk).length;
  if (talkIsValid !== 2) {
    return res.status(HTTP_ERRO_STATUS).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  next();
};

const validateInputTalkProperty = (req, res, next) => {
  const validRegexDate = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  const { talk } = req.body;

  const validWatchedAt = talk
    && Object.keys(talk).includes('watchedAt')
    && validRegexDate.test(talk.watchedAt);
  if (!validWatchedAt) {
    return res.status(HTTP_ERRO_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  });
  }
  if (isInterval(talk.rate, 1, 5)) {
    return res.status(HTTP_ERRO_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  validateInputName,
  validateInputAge,
  validateInputTalk,
  validateInputTalkProperty,
};
