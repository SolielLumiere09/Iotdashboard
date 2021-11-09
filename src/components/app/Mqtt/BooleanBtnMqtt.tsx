import { BooleanBtn } from '../BooleanBtn'
import { useBooleanBtnMqtt } from '../../../hooks/mqtt/useBooleanBtnMqtt';

interface Props {
    widgetId : string
    title : string 
    iconSize : string 
    iconName : string
    publishTopic : string
    propertyName : string
}



export const BooleanBtnMqtt = ({widgetId, title, iconSize, iconName, publishTopic, propertyName} : Props) => {
    const {publishPayload} = useBooleanBtnMqtt(widgetId, publishTopic, propertyName)

    return (
        <>
            <BooleanBtn widgetId={widgetId} title={title} iconSize={iconSize} iconName={iconName} onClick={(status) => {
                publishPayload(status)
            }}/>  
          
        </>
    )
}

export type {Props}
