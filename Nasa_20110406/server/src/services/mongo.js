const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
})

mongoose.connection.on('error', (error) => {
    console.error(error);
})

async function mongoConnect () {
    await mongoose.connect(MONGO_URL);
    console.log('Connect successfully!');
}

async function mongoDisConnect () {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisConnect
}