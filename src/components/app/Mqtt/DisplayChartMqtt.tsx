import { DisplayChart } from '../DisplayChart';
import { useDisplayChartMqtt } from '../../../hooks/mqtt/useDisplayChartMqtt';


interface Props {
    widgetId : string
    title : string,
    unit : string, 
    labels : Array<String>
    data : Array<number>
    topicToSubscribe : string 
    property : string
}

export const DisplayChartMqtt = ({widgetId, data, labels, property, title, topicToSubscribe, unit} : Props) => {
    const {currentData, currentDate, currentLabels, currentMeasure} = useDisplayChartMqtt(widgetId, labels, data, topicToSubscribe, property)

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