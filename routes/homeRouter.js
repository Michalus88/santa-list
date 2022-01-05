const { Router } = require('express');

module.exports = () => {
  const homeRouter = Router();

  homeRouter.get('/', async (req, res) => {
    res.render('home/home');
  });

  return homeRouter;
};
