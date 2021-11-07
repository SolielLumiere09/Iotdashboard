
import { Display } from '../Display';
import { useDisplayMqtt } from '../../../hooks/useDisplayMqtt';


interface Props {
    widgetId : string
    title : string
    unit : string
    topicToSubscribe : string 
    property : string
}


export const DisplayMqtt = ({widgetId, property, title, topicToSubscribe, unit} : Props) => {
    const {currentMeasure, lastArrive} = useDisplayMqtt(widgetId, topicToSubscribe, property, title)

    return (
        <>
            <Display measure={currentMeasure} title={title} unit={unit} date={lastArrive}/>
        </>
    )
}


export type {Props }