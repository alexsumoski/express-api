const express = require('express');
const app = express();
const tourController = require('../controllers/tourController')
const router = express.Router();

router.param('id', tourController.checkID);

app.use('/api/v1/tours', router);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour)

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour)


module.exports = router;