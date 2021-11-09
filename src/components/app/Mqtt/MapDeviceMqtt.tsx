import { MapDevice } from '../MapDevice'
import { useMapDeviceMqtt } from '../../../hooks/mqtt/useMapDeviceMqtt';


interface Props {
    widgetId : string
    title : string 
    height : number
    popupMesage : string
    topicToSubscribe : string 
    property : string 

}

export const MapDeviceMqtt = ({widgetId, height, popupMesage, property, title, topicToSubscribe} : Props) => {
    const {position} = useMapDeviceMqtt(widgetId, topicToSubscribe, property)

    return (
        <>
          <MapDevice
                title={title}
                height={height}
                popupMesage={popupMesage}
                position={position}
            />
        </>
    )
}

export type {Props}