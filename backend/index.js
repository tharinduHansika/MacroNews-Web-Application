const express = require("express")
const itemRoutes = require("./routes/newsRoutes.js")
const authRoutes = require("./routes/authRoutes.js")
const cors = require("cors");
const connectToMongoDB = require('./db.js');
require('dotenv').config()

const app = express();

// CORS
const corsOptions = {
    origin: ['http://localhost:3000', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json())
app.use(cors(corsOptions))

app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
});

// defining routes 
app.use("/user", authRoutes)
app.use("/news", itemRoutes)

const server = app.listen(8080, async () => {
    console.log(`Server is running on http://localhost:8080`);
});

// Handle the server's listening event
server.on('listening', () => {
    console.log('Server is now listening');
    connectToMongoDB()
});

// Handle errors if any
server.on('error', (error) => {
    console.error('Error occurred:', error);
});
