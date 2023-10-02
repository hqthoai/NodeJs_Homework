const express = require('express');
const {engine} = require('express-handlebars');
const methodOverride = require('method-override');

const logger = require('./middlewares/logger');
const route = require('./routes/index')
const port = 5000;

const app = express();
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use(logger);
app.use(methodOverride('_method'));

app.engine('hbs', engine()); 
app.set('view engine', 'hbs');   
app.set('views', './views');
route(app);

app.listen(port, ()=> console.log(`Server is running on http://localhost:${port}`));