import { useState, useEffect, useMemo } from 'react';
import { LatLngTuple } from 'leaflet';
import mqtt from 'mqtt'
import { mqttConfiguration, MQTT_SERVER } from 'contexts/app/Generalvariables';



export const useMapDeviceMqtt = (widgetId : string, topicToSubscribe : string, property : string) => {
    const [position, setPosition] = useState<LatLngTuple>([0, 0])
    
    const client = useMemo(() => {
        return (
            mqtt.connect(MQTT_SERVER, {
                ...mqttConfiguration,
                clientId : widgetId + Math.random() * 0xFFFF,
            })
        )
    }, [widgetId])


    useEffect(() => {
        
        client.on('connect', () => {
            console.log('connected');
            client.subscribe(topicToSubscribe)
        })

        client.on('message', (topic, payload) => {
            const msg = JSON.parse(payload.toString())
            console.log(msg);
            
            if(topic === topicToSubscribe && msg[property] !== undefined){
                setPosition(msg[property])
            } 
        })



        return () => {
            client.end(true, () => {
                console.log('disconnected');
                
            })
        }
    }, [client, property, topicToSubscribe])
    
    
    
    return {
        position
    }
}
