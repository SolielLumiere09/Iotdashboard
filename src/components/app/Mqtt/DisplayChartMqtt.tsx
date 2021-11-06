import { DisplayChart } from '../DisplayChart';
import { useDisplayChartMqtt } from '../../../hooks/useDisplayChartMqtt';


interface Props {
    deviceId : string
    title : string,
    unit : string, 
    labels : Array<String>
    data : Array<number>
    topicToSubscribe : string 
    property : string
}

export const DisplayChartMqtt = ({deviceId, data, labels, property, title, topicToSubscribe, unit} : Props) => {
    const {currentData, currentDate, currentLabels, currentMeasure} = useDisplayChartMqtt(deviceId, labels, data, topicToSubscribe, property)

    return (
        <>
             <DisplayChart
                title={title} 
                data={currentData}
                date={currentDate}
                labels={currentLabels}
                measure={currentMeasure}
                unit={unit}
            />
        </>
    )
}

export type {Props}