const userModel = require('../models/userModel');

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

const isValid = (email) => ((/\S+@\S+\.\S+/).test(email));

const createUser = async ({ name, email, password }) => {
  const userExist = await userModel.userExists(email);
  if (userExist) return { erro: { code: 409, message: 'E-mail já registrado' } };

  const ifExists = ifExist([name, email, password]);
  if (!ifExists) return { erro: { code: 400, message: 'Entradas inválidas. Tente novamente.' } };

  const validateEmail = isValid(email);
  if (!validateEmail) return { erro: { code: 400, message: 'Entradas inválidas. Tente novamente.' } };

  return userModel.create({ name, email, password });
};

module.exports = { validations, createUser };