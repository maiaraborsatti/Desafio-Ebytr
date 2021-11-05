const { ObjectId } = require('mongodb');
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

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  return db.collection('tasks').deleteOne({ _id: ObjectId(id) });
};

const update = async ({ id, task, status, userId }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  const updatedTask = await db.collection('tasks').updateOne(
    { _id: ObjectId(id) }, { $set: { task, status, userId } },
  );
  return updatedTask;
};

module.exports = { create, getAll, exclude, update };