const express = require("express")
const userRouter = express.Router()
const {User, Account} = require("../db/index")
const {JWT_secret} = require("../config")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const zod = require("zod")
const {authMiddleware} = require("../middleware")


const signupBody = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post('/signup', async (req, res)=>{
    const validInput = signupBody.safeParse(req.body)
    if(!validInput.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const username = req.body.username
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = req.body.password

    const existinguser = await User.findOne({username})
    if(existinguser!=null){
        return res.send("Username already exists")
    }
    
    const hashedpassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        firstname,
        lastname,
        username,
        password_hash: hashedpassword
    })
    const userId = user._id

    //new account
    const acc = await Account.create({
        userId,
        balance:  Math.round(1 + Math.random()*10000)
    })

    const token = jwt.sign({userId}, JWT_secret)

    res.status(200).json({
        message: "User created successfully",
        token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post('/signin', async (req, res)=>{
    const validInput = signinBody.safeParse(req.body)
    if(!validInput.success){
        res.status(411).json({
            message: "Invalid Inputs"
        })
    }
    const username = req.body.username
    const password = req.body.password
    const existinguser = await User.findOne({username})
    if(existinguser!=null){
        const isMatch = bcrypt.compare(password, existinguser.password_hash)
        if(isMatch){
            const userId = existinguser._id
            const token = jwt.sign({userId}, JWT_secret)
            res.status(200).json({
                token
            })
        }
        else{
            res.json({
                message: "Invalid password"
            })
        }
        return;
    }
    else{
        res.status(411).json({
            meassage: "Error while logging in"
        })
    }
})


const updateBody = zod.object({
    firstname: zod.string().optional(),
    lastname : zod.string().optional(),
    password : zod.string().optional()
})

userRouter.put('/', authMiddleware, async (req, res)=>{
    const { success } = updateBody.safeParse(req.body)
    if(success){
        try{
            const updateData = {
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
            const userId = req.userId
            if(req.body.password){
                updateData.password_hash = await bcrypt.hash(password, 10)
            }
            
            await User.updateOne({_id: userId}, 
                {
                    $set: updateData
                }
            )
            res.json({
                message: "Updated Successfully"
            })
        }
        catch(err){
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
    else{
        res.status(411).json({
            message: "Error while updating information"
        })
    }
})

userRouter.get('/bulk', async (req, res)=>{
    const filter = req.query.filter || ""
    const users = await User.find({
        $or: [
            {
                firstname: {
                    "$regex": filter
                }
            }, {
                lastname: {
                    "$regex": filter
                }
            }
        ]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = {
    userRouter
}