import express from 'express'
import {Attributes, Widget, props} from '../models/Widget'

const widgetsEndpoint = express.Router()

widgetsEndpoint.post<any, any, any, Attributes, any>('/api/addWidget', async (req, res) => {
    const response = {
        msg : '',
        accepted : false
    }
    
    try {
        const {props, type, userId, widgetId} = req.body
        
        
        if(props !== null && type !== null && userId !== null){

            if(! await Widget.exists({ widgetId })){

                const newWidget = new Widget({
                    userId : userId,
                    widgetId,
                    type,
                    props
                })

                const {errors} = await newWidget.save()
                

                if(errors){
                    response.msg = "There was an error saving the device"
                }
                else {
                    response.msg = "Register widget sucessfull"
                    response.accepted = true
                }

            }else {
                response.msg = "WidgetId already Exists"
            }

        }
        else {
            response.msg = "Invalid params"
        }



    } catch (error) {
       
        
        response.msg = "Server error"
    }


    res.send(response)
})


interface DeleteWidget {
    widgetId : string 
}
widgetsEndpoint.post<any, any, any, DeleteWidget, any>('/api/deleteWidget', async (req, res) => {
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

interface UpdateWidgetParams {
    widgetId : string 
    props : props
}

widgetsEndpoint.post<any, any, any, UpdateWidgetParams, any>('/api/updateWidget', async (req, res) => {
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


interface Req {
    userId : string
}


interface Res {
    accepted : boolean
    msg : string
    widgets : Attributes[]
}

widgetsEndpoint.get<any, any, any, any, Req>('/api/getWidgets', async (req, res) => {
    const response : Res = {
        accepted : false,
        msg : '',
        widgets : []
    }   

    try{

        const {userId} = req.query

        

        if(userId !== undefined){
            const items = await Widget.find({
                userId
            })
            response.accepted = true,
            response.msg = 'success'
            response.widgets = items
           
        }else {
            response.msg = 'undefined userId'
        }


        

    }catch(e){
        response.msg = 'server error'
    }

    res.send(response)
})

export {widgetsEndpoint}