import { useEffect } from 'react'
import { useState, useMemo } from 'react';
import mqtt from 'mqtt';
import { Display } from '../Display';


interface Props {
    title : string
    measure : number
    unit : string
    topicToSubscribe : string 
    property : string
}


export const DisplayMqtt = ({measure, property, title, topicToSubscribe, unit} : Props) => {
    
    const [currentMeasure, setCurrentMeasure] = useState(measure)
    
    
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
                
                setCurrentMeasure(msg[property])
            } 
        })

    }, [client, property, topicToSubscribe])  
    
    
    return (
        <>
            <Display measure={currentMeasure} title={title} unit={unit}/>
        </>
    )
}
