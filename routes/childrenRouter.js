const { Router } = require('express');

const { Child } = require('../mokData');

module.exports = () => {
  const childrenRouter = Router();

  childrenRouter.get('/', (req, res) => {
    // add();
    res.render('children/list', { children, gifts });
  });

  childrenRouter.post('/:name', (req, res) => {
    const { item } = req.body;
    const { name } = req.params;
    add(name, item);
    // console.log(item, name);
    res.redirect('/children');
  });

  return childrenRouter;
};
