import {Props as WidgetProp} from '../../components/app/Widget'
import axios from 'axios'


const APP_LOGIN_STATUS = "APP_STATUS_USER"

interface Response {
    
    msg : string,
    accepted : boolean
    
}


interface WidgetDBprops extends WidgetProp{
    userId : string 
    widgetId : string
}

const axiosInstance = axios.create({
    baseURL : 'http://localhost:3001'
})


export {APP_LOGIN_STATUS, axiosInstance}
export type {WidgetDBprops, Response}