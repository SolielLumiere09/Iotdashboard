import express from 'express'
import bcrypt from 'bcrypt'
import { User, Attributes } from '../models/Users'
import jwt from 'jsonwebtoken'
import { REACT_APP_TOKEN_AUTH  } from '../Server'

const userLoginEndpoint = express.Router()

userLoginEndpoint.get<any, any, any, any, Attributes>('/loginUser', async (req, res) => {
    const response = {
        msg : '',
        accepted : false,
        token : '',
        userId : ''
    }
    const {userName, password} = req.query

    
    try{
        
        const user = await User.findOne({
            userName
        })

        if(bcrypt.compareSync(password, user.password)){
           
            
            const token = jwt.sign({
                userName : user.userName,
                id : user.id
            }, REACT_APP_TOKEN_AUTH)

          
            
            
            response.accepted = true;
            response.token = token
            response.userId = user.id
        }


    }catch(e){
        response.msg = JSON.stringify(e)
    }


    res.json(response)
})


export {userLoginEndpoint}