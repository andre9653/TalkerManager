const { HTTP_ERRO_STATUS, HTTP_OK_STATUS } = require('../utils/constant');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\S+@\S+\.\S+$/;
  const validEmail = regexEmail.test(email);
    if (!email) {
    return res.status(HTTP_ERRO_STATUS).json({ message: 'O campo "email" é obrigatório' });
  } if (!validEmail) {
    return res.status(HTTP_ERRO_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const MIN_CHARACTER_NUMBER = 6;
  const { password } = req.body;
  const havePassword = password && password.length > 0;
  const validPassword = havePassword && password.length >= MIN_CHARACTER_NUMBER;

  if (!password) {
    return res.status(HTTP_ERRO_STATUS).json({ message: 'O campo "password" é obrigatório' });
  } if (!validPassword) {
    return res.status(HTTP_ERRO_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const generateToken = () => {
  const NUMBER_OF_CARACTER_TOKEN = 16;
  const Rand = () => Math.random(0).toString(36).substr(2);
  const token = (length) => (Rand() + Rand() + Rand() + Rand()).substr(0, length);

  return token(NUMBER_OF_CARACTER_TOKEN);
};

const login = (req, res) => {
  const token = generateToken();
  // req.headers = { authorization: token };
  res.status(HTTP_OK_STATUS).json({ token });
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    }); 
  }
  next();
};

module.exports = { login, validatePassword, validateEmail, validateToken };