const express = require('express');
const { engine } = require('express-handlebars');

const childrenRouter = require('./routes/childrenRouter');

const app = express();

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.send('home');
});
app.use('/children', childrenRouter());

app.listen(3000);
