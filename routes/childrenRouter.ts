import { Router, Request, Response } from 'express';
// mongoDB
import { catchAsync } from '../utils/errors';

// const { ChildRecord } = require('../records/ChildRecord'); //mariaDB
const { ChildRecord } = require('../records/mongo/child.record'); // mongoDB
// const { GiftRecord } = require('../records/GiftRecord'); //mariaDB
const { GiftRecord } = require('../records/mongo/gift.record');

module.exports = () => {
  const childrenRouter = Router();

  childrenRouter.get('/', catchAsync(async (req:Request, res:Response) => {
    const children = await ChildRecord.findAll();
    const gifts = await GiftRecord.findAll();

    res.render('children/list', { children, gifts });
  }));

  childrenRouter.post('/', catchAsync(async (req:Request, res:Response) => {
    const newChild = new ChildRecord(req.body);
    await newChild.insert();

    res.redirect('/children');
  }));

  childrenRouter.post('/:id/gifts', catchAsync(async (req:Request, res:Response) => {
    const { giftId } = req.body;
    if (giftId === '') return res.redirect('/children');

    const child = await ChildRecord.findOne(req.params.id);
    const gift = await GiftRecord.findOne(giftId);
    await child.addGift(await gift.isGiftAvailable());

    res.redirect('/children');
  }));

  return childrenRouter;
};
