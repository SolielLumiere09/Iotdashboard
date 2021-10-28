import express from 'express'

const userRegisterEndpoint = express.Router()

userRegisterEndpoint.post('/userRegister', async (req, res) => {

    res.send("User Registered")
})



export {userRegisterEndpoint}