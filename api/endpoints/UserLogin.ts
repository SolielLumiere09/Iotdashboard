import express from 'express'
import bcrypt from 'bcrypt'
import { User, Attributes } from '../models/Users'
import jwt from 'jsonwebtoken'
import { TOKEN_AUTH } from '../Server'

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
            
            const token = jwt.sign({
                name : user.userName,
                id : user.id
            }, TOKEN_AUTH)
            
            response.accepted = true;
            response.token = token
        }


    }catch(e){
        
    }


    res.json(response)
})


export {userLoginEndpoint}