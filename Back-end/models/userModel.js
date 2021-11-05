const connection = require('./connection');

const userExists = async (email) => {
  const db = await connection();
  const user = await db.collection('todolist_ebytr').findOne({ email });

  return user;
};

module.exports = { userExists };