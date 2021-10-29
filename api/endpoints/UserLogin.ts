import express from 'express'
import bcrypt from 'bcrypt'
import { User, Attributes } from '../models/Users'

const userLoginEndpoint = express.Router()

userLoginEndpoint.get<any, any, any, any, Attributes>('/loginUser', async (req, res) => {
    const response = {
        accepted : false,
        token : ''
    }
    const {userName, password} = req.query

    try{
        
        const user = await User.findOne({
            userName
        })

        if(bcrypt.compareSync(password, user.password)){
            response.accepted = true;

            response.token = user.id
        }


    }catch(e){
        
    }


    res.json(response)
})


export {userLoginEndpoint}