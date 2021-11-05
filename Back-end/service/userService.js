const userModel = require('../models/loginModel');

const ifExist = (array) => array.every((entrie) => entrie);

const validations = async ({ email, password }) => {
  const ifExists = ifExist([email, password]);
  if (!ifExists) return { erro: { code: 401, message: 'Todos os campos devem ser preenchidos' } };

  const userExist = await userModel.userExists(email);
  if (!userExist || userExist.password !== password) {
    return { erro: { code: 401, message: 'Usuário ou senha incorretos' } };
  }

  return userExist;
};

module.exports = { validations };