import express from 'express'
import {Attributes, Widget, props} from '../models/Widget'

const addWidgetEnpoint = express.Router()


addWidgetEnpoint.post<any, any, any, Attributes, any>('/api/addWidget', async (req, res) => {
    const response = {
        msg : '',
        accepted : false
    }
    
    try {
        const {props, size, type, userId, widgetId} = req.body
        
        
        if(props !== null && size !== null && type !== null && userId !== null){

            if(! await Widget.exists({ widgetId })){

                const newWidget = new Widget({
                    userId : userId,
                    widgetId,
                    type,
                    size,
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
        console.log("error");
        
        response.msg = "Server error"
    }


    res.send(response)
})



export {addWidgetEnpoint}