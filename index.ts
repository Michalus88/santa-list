import express from 'express';
import { engine } from 'express-handlebars';

import childrenRouter from './routes/childrenRouter';
import giftRouter from './routes/giftRouter';
import homeRouter from './routes/homeRouter';
import {handlebarsHelpers} from './utils/handlebarsHelpers';
import {errorHandler} from './utils/errors';

import './config/mariaDb';

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
  }),
);
app.set('view engine', 'hbs');

app.use('/', homeRouter());
app.use('/children', childrenRouter());
app.use('/gifts', giftRouter());

app.use(errorHandler);

app.listen(3000);
