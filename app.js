const express = require('express');
const fs = require('fs');
const { dirname } = require('path');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('From the server');
});

app.post('/', (req, res) => {
    res.status(200).send('posted')
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

