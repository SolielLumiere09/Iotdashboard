import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
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
    
    
    const client = useRef(mqtt.connect('ws://broker.emqx.io/mqtt', {
        port : 8083,
        protocol : 'ws',
        username : 'dcsdcsdcasd' + Math.random() * 1000
    })).current


    useEffect(() => {
        
        client.on('connect', () => {
            console.log("connected")
        })

        client.subscribe(topicToSubscribe, () => {
            console.log("subscribed to " + topicToSubscribe);
            
        })

        client.on('message', (topic, payload) => {
            const msg = JSON.parse(payload.toString())
            if(topic === topicToSubscribe && msg[property] !== undefined){
                
                setCurrentMeasure(msg[property])
            } 
        })

        return () => {
            
        }
    }, [client, property, topicToSubscribe])  
    
    
    return (
        <>
            <Display measure={currentMeasure} title={title} unit={unit}/>
        </>
    )
}
