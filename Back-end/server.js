const express = require('express')
const bodyParser = require('body-parser');

const { authValidation } = require('./auth/authMiddleware');

const userController = require('./controller/userController');
const taskController = require('./controller/taskController');


const app = express();
app.use(bodyParser.json());

app.route('/user')
  .post(userController.createUser);

app.route('/login')
  .post(userController.login);

app.use(authValidation);

app.route('/task')
  .post(taskController.createTask)
  .get(taskController.getAll);

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}!`))