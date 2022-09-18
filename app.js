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

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.delete('/api/v1/tours/:id', deleteTour); 
// app.patch('/api/v1/tours/:id', patchTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour)

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

