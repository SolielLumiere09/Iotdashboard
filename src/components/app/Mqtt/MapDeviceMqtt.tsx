import { MapDevice } from '../MapDevice'
import { useMapDeviceMqtt } from '../../../hooks/useMapDeviceMqtt';


interface Props {
    deviceId : string
    title : string 
    height : number
    popupMesage : string
    topicToSubscribe : string 
    property : string 

}

export const MapDeviceMqtt = ({deviceId, height, popupMesage, property, title, topicToSubscribe} : Props) => {
    const {position} = useMapDeviceMqtt(deviceId, topicToSubscribe, property)

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