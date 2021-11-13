import {Props as WidgetProp} from '../../components/app/Widget'
import axios from 'axios'
import mqtt from 'mqtt';


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
    baseURL : `${process.env.REACT_APP_BASE_URL}:3001`
})

const mqttConfiguration : mqtt.IClientOptions= {    
    port : 8083,
    protocol : 'ws',
    path : '/mqtt',
    username : "Widget",
    password : "12345"
}

const MQTT_SERVER = process.env.REACT_APP_BASE_URL


export {APP_LOGIN_STATUS, axiosInstance, mqttConfiguration, MQTT_SERVER}
export type {WidgetDBprops, Response}