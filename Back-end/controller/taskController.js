const taskService = require('../service/taskService');

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

module.exports = { createTask };