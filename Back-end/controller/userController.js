const userService = require('../service/userService');
const auth = require('../auth/jwtFunctions');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.createUser({ name, email, password });

    if (result.erro) {
      return res.status(result.erro.code).json({ message: result.erro.message });
    }

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Deu ruim' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.validations({ email, password });  

    if (result.erro) {
      return res.status(result.erro.code).json({ message: result.erro.message });
    }

    const token = auth.createJWT(result);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ message: 'Deu ruim' });
  }
};

module.exports = { createUser, login };
