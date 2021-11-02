import { useEffect } from 'react'
import mqtt from 'mqtt'
import { BooleanBtn } from '../BooleanBtn'
import { useMemo } from 'react';

interface Props {
    title : string 
    iconSize : string 
    iconName : string
    publishTopic : string
    propertyName : string
}



export const BooleanBtnMqtt = ({title, iconSize, iconName, publishTopic, propertyName} : Props) => {
    
    const client = useMemo(() => {
        return (
            mqtt.connect("http:/localhost", {
                port : 8083,
                protocol : 'ws',
                clientId : 'dcsdcsdcasd' + Math.random() * 1000,
                path : '/mqtt'
            })
        )
    }, [])


    useEffect(() => {
        
        client.once('connect', () => {
            console.log("connected")
        })

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
