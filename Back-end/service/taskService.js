const taskModel = require('../models/taskModel');

const ifExist = (array) => array.every((entrie) => entrie);

const createTask = async ({ task, status }) => {
  const ifExists = ifExist([ task, status ]);
  if (!ifExists) return { erro: { code: 400, message: 'Entradas inválidas. Tente novamente.' } };

  return taskModel.create({ task, status });
};

module.exports = { createTask };