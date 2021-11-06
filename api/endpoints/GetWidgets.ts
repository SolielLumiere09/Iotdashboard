import express from 'express'
import {Attributes, Widget, props} from '../models/Widget'

const getWidgetsEndpoint = express.Router()

interface Req {
    userId : string
}


interface Res {
    accepted : boolean
    msg : string
    widgets : Attributes[]
}

getWidgetsEndpoint.get<any, any, any, any, Req>('/api/getWidgets', async (req, res) => {
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
            console.log(items);
        }else {
            response.msg = 'undefined userId'
        }


        

    }catch(e){
        response.msg = 'server error'
    }

    res.send(response)
})

export {getWidgetsEndpoint}