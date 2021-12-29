const express = require('express');
const bodyParser = require('body-parser');

// importações de middleware
const getTalker = require('./middlewares/getTalkersMiddleware.js');
const getTalkersByIdMiddleware = require('./middlewares/getTalkersByIdMiddleware.js');
const loginMiddleware = require('./middlewares/loginMiddleware.js');
const createTalkerMiddleware = require('./middlewares/createTalkerMiddleware');
const inputValidateMiddleware = require('./middlewares/inputValidateMiddleware');
const editTalkerMiddleware = require('./middlewares/editTalkerMiddleware');
const deleteTalker = require('./middlewares/deleteTalkerMiddleware.js');
const searchTalker = require('./middlewares/searchTalkerMiddleware.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.post('/', (request, response) => {
  console.log(request.body);
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', loginMiddleware.validateToken, searchTalker);
app.post('/talker',
  loginMiddleware.validateToken,
  inputValidateMiddleware.validateInputName,
  inputValidateMiddleware.validateInputAge,
  inputValidateMiddleware.validateInputTalk,
  inputValidateMiddleware.validateInputTalkProperty,
  createTalkerMiddleware.cadastro);

app.get('/talker', getTalker);
app.get('/talker/:id', getTalkersByIdMiddleware);
app.post('/login', loginMiddleware.validateEmail,
loginMiddleware.validatePassword,
loginMiddleware.login);

app.put('/talker/:id', loginMiddleware.validateToken,
inputValidateMiddleware.validateInputName,
inputValidateMiddleware.validateInputAge,
inputValidateMiddleware.validateInputTalk,
inputValidateMiddleware.validateInputTalkProperty,
editTalkerMiddleware);

app.delete('/talker/:id', loginMiddleware.validateToken, deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
