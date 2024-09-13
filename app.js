const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/product');
const ordersRoutes = require('./api/routes/orders');

// Database connection
mongoose.connect(
    'mongodb+srv://musabkaya047:' + 
        process.env.MONGO_ATLAS_PW + 
        '@jstestcluster.dltrg.mongodb.net/?retryWrites=true&w=majority&appName=JSTestCluster', 
    {
        useMongoClient: true
    }
);


const app = express();

// Mongoose promise for depracated warnings
mongoose.Promise = global.Promise;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

// CORS (Cross Origin Resource Sharing) error handling middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Error handling middleware
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })