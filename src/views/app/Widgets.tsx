import { Col, Row } from 'reactstrap'
import { BooleanBtnMqtt } from '../../components/app/Mqtt/BooleanBtnMqtt';
import { DisplayMqtt } from '../../components/app/Mqtt/DisplayMqtt';

export const Widgets = () => {

    return (
        <>
            <div className="content">
                <Row>
                    <Col xs={12} lg={3}>
                        <DisplayMqtt title="Temperature" measure={123} unit="°C" topicToSubscribe="xawstw/house/temperature" property="measure"/>
                    </Col>
                    <Col xs={12} lg={3}>
                        <BooleanBtnMqtt title="Bulb" iconSize="5em" iconName={'FaRocket'} propertyName="bulbStatus" publishTopic="xawstw/house/bulb"/>
                    </Col>
                </Row>

            </div>
        </>
    )
}
