import { useMemo } from 'react';
import { useEffect } from 'react'
import mqtt from 'mqtt'

export const useBooleanBtnMqtt = (deviceId : string, publishTopic : string, propertyName : string) => {


    const client = useMemo(() => {
        return (
            mqtt.connect("http:/localhost", {
                port : 8083,
                protocol : 'ws',
                clientId : deviceId,
                path : '/mqtt'
            })
        )
    }, [deviceId])


    const publishPayload = (status : boolean) => {
        client.publish(publishTopic, JSON.stringify({
            [propertyName] : status
        }), {retain : true})
    }

    useEffect(() => {
        
        client.on('connect', () => {
            console.log("connected")
        })

        return ()=> {
            client.end(true, () => {
                console.log('disconected'); 
            })
        }
    }, [client])  
    
    
    
    return {
        publishPayload
    }
}
