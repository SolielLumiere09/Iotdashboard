import { Card, CardBody, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';
import { BooleanBtnForm } from 'components/app/Forms/BooleanBtnForm';


export const Widgets = () => {  

    const [option, setOption] = useState(0)

            const map = {
            BooleanButton : 0,
            Display : 1,
            DisplayChart : 2,
            MapDevice : 3
        }
        

    const renderOption = () => {
        let component = <></>


        switch(option){
            case 0 : 
                component =  <BooleanBtnForm />
                break
        }


        return component
    }

    return (
        <>
            <div className='content'>
                <Row>
                    <Col lg={6}>
                        <Card >
                            <CardBody>

                            <FormGroup>
                                <Label for="exampleSelect1">Widget</Label>
                                <Input type="select" name="select" id="exampleSelect1" onChange={(event) => {setOption(map[event.target.value])}}>
                                    <option onClick={() => setOption(0)}>BooleanButton</option>
                                    <option onClick={() => setOption(1)}>Display</option>
                                    <option onClick={() => setOption(2)}>DisplayChart</option>
                                    <option onClick={() => setOption(3)}>MapDevice</option>
                                </Input>
                                </FormGroup>

                                {
                                    renderOption()
                                }
                               
                            

                            </CardBody>
                        </Card>

                    </Col>
                </Row>

            </div>

        </>
    )
}
