import { BooleanBtn } from '../BooleanBtn'
import { useBooleanBtnMqtt } from '../../../hooks/mqtt/useBooleanBtnMqtt';

interface Props {
    widgetId : string
    title : string 
    iconSize : string 
    iconName : string
    publishTopic : string
    payloadWhenOff : string
    payloadWhenOn : string
}



export const BooleanBtnMqtt = ({widgetId, title, iconSize, iconName, publishTopic, payloadWhenOn, payloadWhenOff} : Props) => {
    const {publishPayload} = useBooleanBtnMqtt(widgetId, publishTopic, payloadWhenOn, payloadWhenOff)

    return (
        <>
            <BooleanBtn widgetId={widgetId} title={title} iconSize={iconSize} iconName={iconName} onClick={(status) => {
                publishPayload(status)
            }}/>  
          
        </>
    )
}

export type {Props}
