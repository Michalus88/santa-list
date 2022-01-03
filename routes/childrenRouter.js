const { Router } = require('express');

const { Child } = require('../mokData');
const { GiftRecord } = require('../records/GiftRecord');

module.exports = () => {
  const childrenRouter = Router();

  childrenRouter.get('/', async (req, res) => {
    const children = await Child.findAll();
    // console.log(children);
    const gifts = await GiftRecord.findAll();
    res.render('children/list', { children, gifts });
  });

  childrenRouter.post('/:name', (req, res) => {
    const { item } = req.body;
    const { name } = req.params;
    const child = Child.findOne(name);
    console.log(child);
    child.addGift(item);
    // add(name, item);
    console.log(item, name);
    res.redirect('/children');
  });

  return childrenRouter;
};
