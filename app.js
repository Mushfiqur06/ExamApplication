const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Connect Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://exampApplicationUser:exmapp123@ds255784.mlab.com:55784/examapplication', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', () => {
    console.log('Database Not Connected');
});

db.once('open', () => {
    console.log('Database Connected');
})

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routers
app.use('/api/users', require('./routes/userRoutes'))

//PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is on Fire...'))
