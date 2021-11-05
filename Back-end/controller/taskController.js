const taskService = require('../service/taskService');
const taskModel = require('../models/taskModel');

const createTask = async (req, res) => {
  try {
    const { task, status } = req.body;
    const result = await taskService.createTask({ task, status });

    if (result.erro) {
      return res.status(result.erro.code).json({ message: result.erro.message });
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Deu ruim' });
  }
};

const getAll = async (_req, res) => {
  try {
      const tasks = await taskModel.getAll();
      return res.status(200).json(tasks);
  } catch (error) {
      return res.status(500).json({ message: 'Deu ruim' });
  }
};

module.exports = { createTask, getAll };