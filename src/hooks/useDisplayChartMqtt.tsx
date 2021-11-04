import { useEffect, useMemo, useState } from 'react';
import mqtt from 'mqtt'
import moment from 'moment';

export const useDisplayChartMqtt = (deviceId : string, labels : Array<String>,  data : Array<number>, topicToSubscribe : string,  property : string) => {
    
    const [currentMeasure, setCurrentMeasure] = useState(0)
    const [currentLabels, setCurrentLabels] = useState(labels)
    const [currentData, setCurrentData] = useState(data)
    const [currentDate, setCurrentDate] = useState('')

    
    const client = useMemo(() => {
        return mqtt.connect("http:/localhost", {
            port : 8083,
            protocol : 'ws',
            clientId : deviceId,
            path : '/mqtt'
        })
    }, [deviceId])

    useEffect(() => {
        try{
            const saveLabels = window.localStorage.getItem(deviceId+'labels').split(',')
            const saveData = window.localStorage.getItem(deviceId+'data').split(',')
            const saveValue = Number(window.localStorage.getItem(deviceId+'currentValue'))
            const savedDate = window.localStorage.getItem(deviceId+'date')

            if(saveLabels.length > 0)
                setCurrentLabels(saveLabels)
            if(saveData.length > 0)
                setCurrentData(saveData.map(value => Number(value)))
            if(saveValue)
                setCurrentMeasure(saveValue)
            if(savedDate)
                setCurrentDate(savedDate)
            
        }catch(e){


        }
       

        return () => {
            
        }
    }, [deviceId])

    useEffect(() => {
        
        client.on('connect', () => {
            console.log("connected");
            client.subscribe(topicToSubscribe)
        })

        client.on('message', (topic, payload) => {
            const msg = JSON.parse(payload.toString())
          
            if(topic === topicToSubscribe && msg[property] !== undefined){
                console.log("hello")
                setCurrentLabels(value => {
                    const date = moment().format('h:mm:ss')
                    const array = [...value]
                    array.shift()
                    array.push(date)
                    setCurrentDate(date)
                    
                    window.localStorage.setItem(deviceId+'labels', array.join())
                    window.localStorage.setItem(deviceId+'date', date)
                

                    return array
                })

                setCurrentData(value => {
                    const array = [...value]
                    array.shift()
                  
                    
                    array.push(msg[property])
                    setCurrentMeasure(msg[property])
                    window.localStorage.setItem(deviceId+'data', array.toString())
                    window.localStorage.setItem(deviceId+'currentValue', msg[property])
                    
                    return array
                })

            } 
        })

        return () => {
            client.end(true, () => {
                console.log("disconnected");
                
            })
        }
    }, [client, property, topicToSubscribe, deviceId])
    
    
    return {
        currentData,
        currentDate,
        currentLabels,
        currentMeasure
    }
}
