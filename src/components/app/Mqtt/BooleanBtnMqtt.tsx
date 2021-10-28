import React, { useEffect, useRef } from 'react'
import mqtt from 'mqtt'
import { BooleanBtn } from '../BooleanBtn'

interface Props {
    title : string 
    iconSize : string 
    iconName : string
    publishTopic : string
    propertyName : string
}



export const BooleanBtnMqtt = ({title, iconSize, iconName, publishTopic, propertyName} : Props) => {
    
    const client = useRef(mqtt.connect('ws://broker.emqx.io/mqtt', {
        port : 8083,
        protocol : 'ws',
        username : 'dcsdcsdcasd' + Math.random() * 1000
    })).current


    useEffect(() => {
        
        client.on('connect', () => {
            console.log("connected")
        })


        return () => {
            
        }
    }, [client])  

    return (
        <>
            <BooleanBtn title={title} iconSize={iconSize} iconName={iconName} onClick={(status) => {
                client.publish(publishTopic, JSON.stringify({
                    [propertyName] : status
                }))
            }}/>  
        </>
    )
}
