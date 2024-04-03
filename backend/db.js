const { mongoose } = require('mongoose');
require('dotenv').config()

console.log(process.env.MONGO_USERNAME);
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PWD;
const clusterName = process.env.MONGO_CLUSTURE;
const databaseName = process.env.MONGO_DATABASE;

const mongooseOptions = {
    retryWrites: false,
};

const connectionString = `mongodb+srv://${username}:${password}@${clusterName}.lirskdb.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=${clusterName}`

async function connectToMongoDB() {
    try {
        await mongoose.connect(connectionString, mongooseOptions);
        console.log("connected to DB");

    } catch (e) {
        console.log(e);
    }
}

module.exports =
    connectToMongoDB
