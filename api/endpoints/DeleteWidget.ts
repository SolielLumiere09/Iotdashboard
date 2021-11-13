import express from 'express'
import {Widget} from '../models/Widget'

const deleteWidgetEndpoint = express.Router()

interface Attributes {
    widgetId : string 
}

deleteWidgetEndpoint.post<any, any, any, Attributes, any>('/api/deleteWidget', async (req, res) => {
    const response = {
        msg : '',
        accepted : false
    }

    try {
        const {widgetId} = req.body
        
        const {acknowledged} = await Widget.deleteOne({
            widgetId
        })

        if(acknowledged){
            response.accepted = true 
            response.msg = "Delete Successfully"
        }
        else {
            response.accepted = true 
            response.msg = "Delete Successfully"
        }
        //here needs to validate

    

    }catch(e){
        response.msg = "Server Error"
    }


    res.send(response)
})

export {deleteWidgetEndpoint}