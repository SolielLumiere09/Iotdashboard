import { Col, Row } from 'reactstrap'
import { BooleanBtnMqtt } from '../../components/app/Mqtt/BooleanBtnMqtt';
import { DisplayMqtt } from '../../components/app/Mqtt/DisplayMqtt';
import { DisplayChartMqtt } from '../../components/app/Mqtt/DisplayChartMqtt';

export const Widgets = () => {
 // const labels = ["JUL", "AUG", "SEP", "OCT", "NOV", "JAN","JUL", "AUG", "SEP", "OCT", "NOV", "JAN"]
    // const data = [90, 27, 60, 12, 80, 56,90, 27, 60, 12, 80, 56]

    return (
        <>
            <div className="content">
                <Row>
                    <Col xs={12} lg={3}>
                        <DisplayMqtt deviceId="myDisplayId" title="Temperature" unit="°C" topicToSubscribe="xawstw/house/temperature" property="measure"/>
                    </Col>
                    <Col xs={12} lg={3}>
                        <BooleanBtnMqtt deviceId="myIdBollean" title="Bulb" iconSize="5em" iconName={'FaRocket'} propertyName="bulbStatus" publishTopic="xawstw/house/bulb"/>
                    </Col>
                    <Col xs={12} lg={3}>
                       <DisplayChartMqtt
                            unit={'PA'}
                            data={[0,0,0,0,0,0,0,0,0,0]}
                            deviceId={'chartId123'}
                            labels={['','','','','','','','','','',]}
                            property={'measure'}
                            title={'Preasure'}
                            topicToSubscribe={'preasure/measure'}
                       />
                    </Col>
                </Row>

            </div>
        </>
    )
}
