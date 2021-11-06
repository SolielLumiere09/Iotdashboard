import { Col} from 'reactstrap'
import { BooleanBtnMqtt, Props as BooleanBtnProps } from '../../components/app/Mqtt/BooleanBtnMqtt';
import { DisplayMqtt, Props as DisplayMqttProps } from '../../components/app/Mqtt/DisplayMqtt';
import { DisplayChartMqtt, Props as DsiplayChartProps } from '../../components/app/Mqtt/DisplayChartMqtt';
import { MapDeviceMqtt, Props as MapDeviceProps } from 'components/app/Mqtt/MapDeviceMqtt';


type ComponentProps = BooleanBtnProps | DisplayMqttProps | DsiplayChartProps | MapDeviceProps
type TypeComponent = 
    | 'BooleanBtnMqtt'
    | 'DisplayMqtt'
    | 'DisplayChartMqtt'
    | 'MapDeviceMqtt' 

interface Props {
    type : TypeComponent
    size : {
        xs : number
        sm : number 
        md : number 
        lg : number 
        xl : number
    }
    props : ComponentProps
}


export const Widget = ({type, size, props} : Props) => {

    const renderComponent = () => {
        let Item = <></>
        switch(type){
            case 'BooleanBtnMqtt' :
                Item = <BooleanBtnMqtt {...props as BooleanBtnProps}/> 
                break;
            case 'DisplayMqtt':
                Item = <DisplayMqtt {...props as DisplayMqttProps}/>
                break
            case 'DisplayChartMqtt':
                Item = <DisplayChartMqtt {...props as DsiplayChartProps}/>
                break
            case 'MapDeviceMqtt':
                Item = <MapDeviceMqtt {...props as MapDeviceProps}/>
                break
        }

        return Item;
    }

    return (
        <Col {...size}>
            {renderComponent()}
        </Col>
    )
}

export type {Props}
