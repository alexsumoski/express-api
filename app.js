const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

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
    res.status(200).send('posted');
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
