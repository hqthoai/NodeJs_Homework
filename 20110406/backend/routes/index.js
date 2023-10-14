const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const postRouter = require('./post');

function route (app) {
    app.use('/posts', postRouter);
    app.use('/', homeRouter);
}

module.exports = route;