const express = require('express')
const bodyParser = require('body-parser');

// const { authValidation } = require('./auth/authMiddleware');

const userController = require('./controller/userController');


const app = express();
app.use(bodyParser.json());


app.get('/', (request, response) => { response.send('estou')});

app.route('/user')
  .post(userController.createUser);

app.route('/login')
  .post(userController.login);

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}!`))