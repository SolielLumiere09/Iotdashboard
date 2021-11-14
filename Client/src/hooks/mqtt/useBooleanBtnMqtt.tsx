import { useMemo } from 'react';
import { useEffect } from 'react'
import mqtt from 'mqtt'
import { mqttConfiguration, MQTT_SERVER } from 'contexts/app/Generalvariables';

export const useBooleanBtnMqtt = (widgetId : string, publishTopic : string, payloadWhenOff : string, payloadWhenOn : string) => {


    const client = useMemo(() => {
        return (
            mqtt.connect(MQTT_SERVER, {
                ...mqttConfiguration,
                clientId : widgetId + Math.random() * 0xFFFF,
            })
        )
    }, [widgetId])


    const publishPayload = (status : boolean) => {
        if(!status){
            client.publish(publishTopic, payloadWhenOn, {retain : true})
          
            
        }else {
            client.publish(publishTopic, payloadWhenOff, {retain : true})

            
        }
        
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
    }, [client, publishTopic])  
    
    
    
    return {
        publishPayload
    }
}
