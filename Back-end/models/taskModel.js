const connection = require('./connection');

const create = async ({ task, status }) => {
  const db = await connection();
  const createdTask = await db.collection('tasks')
  .insertOne({ task, status, date: new Date() });

  return { task: {task, status, date: new Date(), _id: createdTask.insertedId } };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('tasks').find().toArray();
};

module.exports = { create, getAll };