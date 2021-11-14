import express from 'express'
import mongoose from 'mongoose';
import { MQTT } from './endpoints/MQTT';
import {config} from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { deviceEndpoint } from './endpoints/Devices';
import { usersEndpoint } from './endpoints/Users';
import { widgetsEndpoint } from './endpoints/Widgets';

const {parsed : {REACT_APP_MONGO_DB_ENDPOINT, REACT_APP_MONGODB_USER, REACT_APP_MONGO_DB_PASSWORD, REACT_APP_DATABASE, REACT_APP_TOKEN_AUTH}} = config({
    path : '../.env'
})

const app = express()

//set the cors
app.use(cors({
    origin : '*'
}))
app.use(bodyParser())

//set middleware
app.use('/api',(req, res, next) => {
    // const token = req.header('auth-token')
    // if (!token) return res.status(401).json({ error: 'Access Denied' })
    // try {
    //     jwt.verify(token, REACT_APP_TOKEN_AUTH)
    //     next() 
    // } catch (error) {
    //     res.status(400).json({error: 'Invalid Token'})
    // }
    next()
})

//set endpoints
app.use(usersEndpoint)
app.use(deviceEndpoint)
app.use(widgetsEndpoint)
app.use(MQTT);

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


export {REACT_APP_TOKEN_AUTH}