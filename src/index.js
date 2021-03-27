const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Initial Setup done')
});

app.listen(3000, () => {
    console.log('Server is listening on Port 3000')
});