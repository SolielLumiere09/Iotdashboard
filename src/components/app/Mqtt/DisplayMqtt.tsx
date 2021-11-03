import { useEffect } from 'react'
import { useState, useMemo } from 'react';
import mqtt from 'mqtt';
import { Display } from '../Display';
import moment from 'moment';

interface Props {
    deviceId : string
    title : string
    unit : string
    topicToSubscribe : string 
    property : string
}


export const DisplayMqtt = ({deviceId, property, title, topicToSubscribe, unit} : Props) => {
    
    const [currentMeasure, setCurrentMeasure] = useState(Number(window.localStorage.getItem(deviceId)))
    
    
    const client = useMemo(() => {
        return(
            mqtt.connect('http:/localhost', {
            port : 8083,
            protocol : 'ws',
            clientId : 'dcsdcsdcasd' + Math.random() * 1000,
            path: "/mqtt"
        }))
    }, [])


    useEffect(() => {
        
        client.once('connect', () => {
            console.log("connected")
        })

        client.subscribe(topicToSubscribe, () => {
            console.log("subscribed to " + topicToSubscribe);
            
        })

        client.once('message', (topic, payload) => {
            const msg = JSON.parse(payload.toString())
            if(topic === topicToSubscribe && msg[property] !== undefined){
                window.localStorage.setItem(deviceId, msg[property])
                window.localStorage.setItem(deviceId + title, moment().format('MMMM Do YYYY, h:mm:ss a'))
                setCurrentMeasure(msg[property])
            } 
        })

    }, [client, property, topicToSubscribe, deviceId, title])  
    
    
    return (
        <>
            <Display measure={currentMeasure} title={title} unit={unit} date={window.localStorage.getItem(deviceId + title)}/>
        </>
    )
}
