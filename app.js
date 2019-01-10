const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routers
app.use('/api/users', require('./routes/userRoutes'))

//PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server is on Fire...');
    mongoose.connect('mongodb://localhost:27017/exam-application', {useNewUrlParser: true}, () => {
        console.log('Database running... ')
    });
})
