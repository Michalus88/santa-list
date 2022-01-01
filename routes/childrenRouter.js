const { Router } = require('express');

const { children, gifts, add } = require('../mokData');

module.exports = () => {
  const childrenRouter = Router();

  childrenRouter.get('/', (req, res) => {
    // add();
    res.render('children/list', { children, gifts });
  });
  return childrenRouter;
};
