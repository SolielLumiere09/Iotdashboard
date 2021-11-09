import { useMemo } from 'react';
import { useEffect } from 'react'
import mqtt from 'mqtt'
import { mqttConfiguration } from 'contexts/app/Generalvariables';

export const useBooleanBtnMqtt = (widgetId : string, publishTopic : string, propertyName : string) => {


    const client = useMemo(() => {
        return (
            mqtt.connect("http:/localhost", {
                ...mqttConfiguration,
                clientId : widgetId,
            })
        )
    }, [widgetId])


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
