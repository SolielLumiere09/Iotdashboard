
import { Display } from '../Display';
import { useDisplayMqtt } from '../../../hooks/useDisplayMqtt';


interface Props {
    deviceId : string
    title : string
    unit : string
    topicToSubscribe : string 
    property : string
}


export const DisplayMqtt = ({deviceId, property, title, topicToSubscribe, unit} : Props) => {
    const {currentMeasure, lastArrive} = useDisplayMqtt(deviceId, topicToSubscribe, property, title)

    return (
        <>
            <Display measure={currentMeasure} title={title} unit={unit} date={lastArrive}/>
        </>
    )
}


export type {Props }