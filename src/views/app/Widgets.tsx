import { BooleanBtn } from 'components/app/BooleanBtn'
import { Col, Row } from 'reactstrap'

export const Widgets = () => {
    return (
        <>
            <div className="content">
                <Row>
                    <Col xs={6} lg={3}>
                        <BooleanBtn title="Bulb" iconSize="5em" iconName={'FaRocket'}/>
                    </Col>
                </Row>

            </div>
        </>
    )
}
