const express = require('express');
const app = express();
const userController = require('../controllers/userController')
const router = express.Router();

app.use('/api/v1/users', router);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getAllUsers)
  .delete(userController.deleteUser)
  .patch(userController.updateUser)

module.exports = router;
