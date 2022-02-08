const { Router } = require('express');
const { ChildRecord } = require('../records/ChildRecord');

module.exports = () => {
  const homeRouter = Router();

  homeRouter.get('/', async (req, res) => {
    await ChildRecord.findOne('07092b21-6e67-11ec-860f-204747ae7160');
    res.render('home');
  });

  return homeRouter;
};
