const { Router } = require('express');

module.exports = () => {
  const homeRouter = Router();

  homeRouter.get('/', (req, res) => {
    res.render('home');
  });

  return homeRouter;
};
