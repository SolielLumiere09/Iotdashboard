import express from 'express'
import { Device, Attributes} from "../models/Device";

const deviceEndpoint = express.Router()


interface GetParams {
    userId : string
}

deviceEndpoint.get<any, any, any, any, GetParams>('/api/getDevices', async (req, res) => {
    let response = []

    try{
        const {userId} = req.query

        const items = await Device.find({
            userId
        })

        response = items

    }catch(e){

    
    }   

    res.send(response)
})


deviceEndpoint.post<any, any, any, Attributes, any>('/api/addDevice', async (req, res) => {
    const response = {
        msg : "",
        accepted : false
    }

    try{

        const {deviceId, deviceName, password, username, userId} = req.body
        
        if(!await Device.exists({deviceId}) && !await Device.exists({username})){

            const newDevice = new Device({
                userId,
                deviceId,
                deviceName,
                password,
                username,
                subscribe : '#',
                publish : '#'
            })

            const {errors} = await newDevice.save();
            
            if(!errors){
                response.msg = "Device Registered"
                response.accepted = true
            }else {
                response.msg = "There was an error saving the device"
            }


        }else {
            response.msg = "DeviceId already exists or username"
        }


    }catch(e){

        response.msg = "Server Error"

    }

    res.send(response)
})




export {deviceEndpoint}