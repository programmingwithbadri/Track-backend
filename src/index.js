require('./models/User');
require('./models/Track');
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const app = express();
app.use(express.json())
app.use(cors())
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:muMb1LK3F9Mh4bSk@cluster0.nuy5d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDb instance')
});

mongoose.connection.on('error', (err) => {
    console.log('Error connected to MongoDb instance', err)
});

app.get('/', (req, res) => {
    res.send('Initial Setup done')
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening')
});