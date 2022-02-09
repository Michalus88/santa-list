import { Router, Request, Response } from 'express';
import { catchAsync } from '../utils/errors';
// import { ChildRecord } from '../records/ChildRecord'; //mariaDB
import  { ChildRecord } from '../records/mongo/child.record'; // mongoDB
// import { GiftRecord } from '../records/GiftRecord'; //mariaDB
import { GiftRecord } from '../records/mongo/gift.record'; // mongoDB

export default () => {
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
