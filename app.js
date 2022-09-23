const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');


app.use(morgan('dev'))
app.use(express.json());

app.use((req, res, next)  => {
    console.log('Middleware');
    next();
});

app.use((req, res, next)  => {
    req.requestTime = new Date().toISOString();
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('From the server');
});

app.post('/', (req, res) => {
    res.status(200).send('posted')
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

const deleteTour = (req, res) => {

    if (req.params.id * 1 > tours.length ) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}

const updateTour =  (req, res) => {

    if (req.params.id * 1 > tours.length ) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour />'
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    });
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
}

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour)

app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser)

app
  .route('/api/v1/users/:id')
  .get(getAllUsers)
  .delete(deleteUser)
  .patch(updateUser)

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

