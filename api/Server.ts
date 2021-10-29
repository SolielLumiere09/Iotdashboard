import express from 'express'
import mongoose from 'mongoose';
import { userRegisterEndpoint } from './endpoints/UserRegister';
import { userLoginEndpoint } from './endpoints/UserLogin';
import {config} from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const {parsed : {REACT_APP_MONGO_DB_ENDPOINT, REACT_APP_MONGODB_USER, REACT_APP_MONGO_DB_PASSWORD, REACT_APP_DATABASE, TOKEN_AUTH}} = config({
    path : '../.env'
})

const app = express()

//set the cors
app.use(cors({
    origin : '*'

}))

//set middleware
app.use('/api',(req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Access Denied' })
    try {
        jwt.verify(token, TOKEN_AUTH)
        next() 
    } catch (error) {
        res.status(400).json({error: 'Invalid Token'})
    }
})

//set endpoints
app.use(userRegisterEndpoint)
app.use(userLoginEndpoint)


console.clear();
app.listen(3001, () => {
    console.log("listening port 3001")
});


mongoose.connect(REACT_APP_MONGO_DB_ENDPOINT, {
    auth : {
        username : REACT_APP_MONGODB_USER,
        password : REACT_APP_MONGO_DB_PASSWORD
    },
    dbName : REACT_APP_DATABASE
}).then(() => {
    console.log('Conectado a la base de datos')
}).catch(() => {
    console.log("error de conexion");
    
});


export {TOKEN_AUTH}