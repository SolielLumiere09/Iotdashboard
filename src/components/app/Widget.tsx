import { Col} from 'reactstrap'
import { BooleanBtnMqtt, Props as BooleanBtnProps } from '../../components/app/Mqtt/BooleanBtnMqtt';
import { DisplayMqtt, Props as DisplayMqttProps } from '../../components/app/Mqtt/DisplayMqtt';
import { DisplayChartMqtt, Props as DsiplayChartProps } from '../../components/app/Mqtt/DisplayChartMqtt';
import { MapDeviceMqtt, Props as MapDeviceProps } from 'components/app/Mqtt/MapDeviceMqtt';


export type ComponentProps = BooleanBtnProps | DisplayMqttProps | DsiplayChartProps | MapDeviceProps
type TypeComponent = 
    | 'BooleanBtnMqtt'
    | 'DisplayMqtt'
    | 'DisplayChartMqtt'
    | 'MapDeviceMqtt' 

interface Props {
    type : TypeComponent
    props : ComponentProps
}


export const Widget = ({type, props} : Props) => {

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
        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
            {renderComponent()}
        </Col>
    )
}

export type {Props}
