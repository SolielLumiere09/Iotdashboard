import express from 'express'
import { User, Attributes } from '../models/Users'
import bcrypt from 'bcrypt'

const userRegisterEndpoint = express.Router()

userRegisterEndpoint.post<any, any, any, Attributes, any>('/userRegister', async (req, res) => {
    const response = {
        accepted : false,
        msg : ''
    }

    try{
        const {password, userName} = req.body
    
      
        if(userName !== undefined && password !== undefined && userName.length > 0 && password.length > 0){
            
    
            if(await User.exists({ userName })) {
                response.msg = "User already registered"
            }
            else {
    
                const hash = bcrypt.hashSync(password, 10)
                
                const newUser = new User({
                    userName,
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

    }catch(e){
        response.msg = "There was an error"
    }
    


    res.send(response)
   
})



export {userRegisterEndpoint}