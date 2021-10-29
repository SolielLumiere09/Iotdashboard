import express from 'express'
import { User, Attributes } from '../models/Users'
import bcrypt from 'bcrypt'

const userRegisterEndpoint = express.Router()

userRegisterEndpoint.post<any, any, any, any, Attributes>('/userRegister', async (req, res) => {

    const {password, userName} = req.query

    const response = {
        accepted : false,
        msg : ''
    }

    if(userName !== undefined && password !== undefined){
        

        if(await User.exists({ userName })) {
            response.msg = "User already registered"
        }
        else {

            const hash = bcrypt.hashSync(password, 10)
            
            const newUser = new User({
                userName : req.query.userName,
                password : hash
            })
    
            const {errors} = await newUser.save()
               
            if(errors){ 
               response.msg = "There was an error registering the user"
            }
            else {
                response.accepted = true 
                response.msg = "User registered sucessfully"
            }
        }
    
    }
    else {
        response.msg = "No matching parameters!"
    }


    res.send(response)
   
})



export {userRegisterEndpoint}