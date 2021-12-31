const { Router } = require('express');

module.exports = () =>{
    const childrenRouter = Router();

    childrenRouter.get('/',(req,res)=>{
        res.send("children")

        return childrenRouter;
    })
}