import { BooleanBtn } from '../BooleanBtn'
import { useBooleanBtnMqtt } from '../../../hooks/useBooleanBtnMqtt';

interface Props {
    deviceId : string
    title : string 
    iconSize : string 
    iconName : string
    publishTopic : string
    propertyName : string
}



export const BooleanBtnMqtt = ({deviceId, title, iconSize, iconName, publishTopic, propertyName} : Props) => {
    const {publishPayload} = useBooleanBtnMqtt(deviceId, publishTopic, propertyName)

    return (
        <>
            <BooleanBtn deviceId={deviceId} title={title} iconSize={iconSize} iconName={iconName} onClick={(status) => {
                publishPayload(status)
            }}/>  
        </>
    )
}
