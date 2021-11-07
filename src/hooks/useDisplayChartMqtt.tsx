import { useEffect, useMemo, useState } from 'react';
import mqtt from 'mqtt'
import moment from 'moment';

export const useDisplayChartMqtt = (widgetId : string, labels : Array<String>,  data : Array<number>, topicToSubscribe : string,  property : string) => {
    
    const [currentMeasure, setCurrentMeasure] = useState(0)
    const [currentLabels, setCurrentLabels] = useState(labels)
    const [currentData, setCurrentData] = useState(data)
    const [currentDate, setCurrentDate] = useState('')

    
    const client = useMemo(() => {
        return mqtt.connect("http:/localhost", {
            port : 8083,
            protocol : 'ws',
            clientId : widgetId,
            path : '/mqtt'
        })
    }, [widgetId])

    useEffect(() => {
        try{
            const saveLabels = window.localStorage.getItem(widgetId+'labels').split(',')
            const saveData = window.localStorage.getItem(widgetId+'data').split(',')
            const saveValue = Number(window.localStorage.getItem(widgetId+'currentValue'))
            const savedDate = window.localStorage.getItem(widgetId+'date')

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
    }, [widgetId])

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
                    
                    window.localStorage.setItem(widgetId+'labels', array.join())
                    window.localStorage.setItem(widgetId+'date', date)
                

                    return array
                })

                setCurrentData(value => {
                    const array = [...value]
                    array.shift()
                  
                    
                    array.push(msg[property])
                    setCurrentMeasure(msg[property])
                    window.localStorage.setItem(widgetId+'data', array.toString())
                    window.localStorage.setItem(widgetId+'currentValue', msg[property])
                    
                    return array
                })

            } 
        })

        return () => {
            client.end(true, () => {
                console.log("disconnected");
                
            })
        }
    }, [client, property, topicToSubscribe, widgetId])
    
    
    return {
        currentData,
        currentDate,
        currentLabels,
        currentMeasure
    }
}
