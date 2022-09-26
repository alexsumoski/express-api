const express = require('express');
const app = express();
const morgan = require('morgan');

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

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
