const connection = require('./connection');

const userExists = async (email) => {
  const db = await connection();
  const user = await db.collection('todolist_ebytr').findOne({ email });

  return user;
};

const create = async ({ name, email, password }) => {
  const db = await connection();
  const createdUser = await db.collection('todolist_ebytr')
  .insertOne({ name, email, password, role: 'user' });

  return { user: { name, email, role: 'user', _id: createdUser.insertedId } };
};

module.exports = { userExists, create };