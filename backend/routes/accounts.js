const { Router } = require("express")
const accountRouter = Router()
const { authMiddleware } = require('../middleware')
const { User, Account } = require("../db/index")
const zod = require("zod")
const { default: mongoose } = require("mongoose")



accountRouter.get('/balance', authMiddleware, async (req, res)=>{
    const userId = req.userId
    const userAccount = await Account.findOne({userId})
    if(userAccount){
        res.status(200).json({
            balance: userAccount.balance
        })
        return
    }
    else{
        return res.status(411).json({
            message: "Internal Server Error"
        })
    }
})


const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number().positive()
})

accountRouter.post('/transfer', authMiddleware, async (req, res)=>{
    const { success } = transferBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    const session = await mongoose.startSession()
    try{
        session.startTransaction();
        //transaction started
        const to = req.body.to
        const amount = req.body.amount

        const fromAccount = await Account.findOne({
            userId: req.userId
        }).session(session)
        
        if(fromAccount.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance"
            })
        }

        const toAccount = await Account.findOne({
            userId: to
        }).session(session)
        if(!toAccount || to===req.userId){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            })
        }

        await Account.updateOne(
            {userId: req.userId},
            {$inc: {
                balance: -amount
            }}
        ).session(session)
        await Account.updateOne(
            {
                userId: to
            },
            {
            $inc: {
                balance: amount
            }
        }).session(session)

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        })
    }
    catch(err){
        await session.abortTransaction()
        res.status(500).json({
            message: err
        })
    }
    finally{
        session.endSession()
    }
})



accountRouter.get('/', authMiddleware, async (req, res)=>{
    try{
        const userId = req.userId
        const userAccount = await Account.findOne({userId})
        .populate("userId", "firstname lastname username")
        if(userAccount){
            res.status(200).json({
                userAccount
            })
            return
        }
        else{
            return res.status(404).json({
                message: "Account not found"
            });
        }
    } catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = {
    accountRouter
}