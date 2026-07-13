// const {User} = require("../db/index")
const express = require("express")
const { userRouter } = require('./users')
const { accountRouter } = require('./accounts')
const app = express()


const rootRouter = express.Router()

rootRouter.use('/user', userRouter)
rootRouter.use('/account', accountRouter)

module.exports = {
    rootRouter
}