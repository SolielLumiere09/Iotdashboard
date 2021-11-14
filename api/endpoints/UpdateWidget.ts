import express from 'express'
import {Widget, props} from '../models/Widget'

const updateWidgetEndpoint = express.Router()

interface Attributes {
    widgetId : string 
    props : props
}

updateWidgetEndpoint.post<any, any, any, Attributes, any>('/api/updateWidget', async (req, res) => {
    const response = {
        msg : '',
        accepted : false
    }

    try {
        const {widgetId, props} = req.body
        
     

        const {acknowledged} = await Widget.updateOne({
            widgetId
        }, {
            props
           
        })
        
        if(acknowledged){
            response.msg = "Update complete!"
            response.accepted = true
        }else {
            response.msg = "Error updating"
        }

    }catch(e){
        response.msg = "Server Error"
    }


    res.send(response)
})

export {updateWidgetEndpoint}