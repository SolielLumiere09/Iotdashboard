import { useEffect } from 'react'
import { useState, useMemo } from 'react';
import mqtt from 'mqtt';
import moment from 'moment';

export const useDisplayMqtt = (widgetId : string, topicToSubscribe : string, property : string, dateKey : string) => {
    
    const [currentMeasure, setCurrentMeasure] = useState(Number(window.localStorage.getItem(widgetId)))
    
    const client = useMemo(() => {
      
        return(
            mqtt.connect('http:/localhost', {
            port : 8083,
            protocol : 'ws',
            clientId : widgetId,
            path: "/mqtt"
        }))
    }, [widgetId])


    useEffect(() => {
        
        client.on('connect', () => {
            console.log("connected")
        })

        client.subscribe(topicToSubscribe, () => {
            console.log("subscribed to " + topicToSubscribe);
            
        })

        client.on('message', (topic, payload) => {
            const msg = JSON.parse(payload.toString())
            console.log("message arrived");
            
            if(topic === topicToSubscribe && msg[property] !== undefined){
                window.localStorage.setItem(widgetId, msg[property])
                window.localStorage.setItem(widgetId + dateKey, moment().format('MMMM Do YYYY, h:mm:ss a'))
                setCurrentMeasure(msg[property])
            } 
        })

        return () => {
            client.end(true, () => {
                console.log('disconnected');
                
            })
        }
        
    }, [client, property, topicToSubscribe, widgetId, dateKey])  
    
    
    return {
        currentMeasure,
        lastArrive : window.localStorage.getItem(widgetId + dateKey)
    }
}
