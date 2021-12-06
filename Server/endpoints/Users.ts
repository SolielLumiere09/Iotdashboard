import express from 'express'
import bcrypt from 'bcrypt'
import { User, Attributes } from '../models/Users'
import jwt from 'jsonwebtoken'
import { REACT_APP_TOKEN_AUTH  } from '../Server'


const usersEndpoint = express.Router()

usersEndpoint.get<any, any, any, any, Attributes>('/loginUser', async (req, res) => {
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

interface PasswordChangeAttr {
    id : string
    password : string
    newPassword : string
}

usersEndpoint.post<any, any, any, PasswordChangeAttr, any>("/updatePassword", async(req, res) => {
    const response = {
        accepted : false,
        msg : ''
    }

    try{
        const {newPassword, password, id} = req.body

        //Get the user
        const user = await User.findOne({
            id
        })


        //compare password
        if(bcrypt.compareSync(password, user.password)){
           
            response.accepted = true;
            const hash = bcrypt.hashSync(newPassword, 10)

            const {acknowledged} = await User.updateOne({
                id
            }, {
                password : hash
            })

            if(acknowledged)
            {
                response.accepted = true;
                response.msg = "Password changed"
            }
            else {
                response.accepted = false;
                response.msg = "Error changin password"
            }




        }else {
            response.msg = "Verify your password"
        }


    }catch(e)
    {
        response.msg = "Server Error"
    }


    res.send(response)
})

usersEndpoint.post<any, any, any, Attributes, any>('/userRegister', async (req, res) => {
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



export {usersEndpoint}