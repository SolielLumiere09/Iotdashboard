import React from 'react'
import { Card, CardBody, FormGroup, Label, Input, CardTitle } from 'reactstrap';
import { useState } from 'react';
import { BooleanBtnForm } from 'components/app/Forms/BooleanBtnForm';
import { DisplayForm } from 'components/app/Forms/DisplayForm';
import { DisplayChartForm } from '../Forms/DisplayChartForm';

export const CreateWidget = () => {
    const [option, setOption] = useState(0)

    const map = {
    BooleanButton : 0,
    Display : 1,
    DisplayChart : 2,
}


const renderOption = () => {
let component = <></>


switch(option){
    case 0 : 
        component =  <BooleanBtnForm />
        break
    case 1: component = <DisplayForm/>
        break
    case 2: component = <DisplayChartForm/>
}


return component
}

return (
<>
    <div>
     
        <Card >
            <CardBody>
                <CardTitle className='mb-3'>Create a Widget</CardTitle>
                
                <div className="row">
                    <div className="col-6">
                        <FormGroup>
                            <Label for="exampleSelect1">Widget</Label>
                            <Input type="select" name="select" id="exampleSelect1" onChange={(event) => {setOption(map[event.target.value])}}>
                                <option onClick={() => setOption(0)}>BooleanButton</option>
                                <option onClick={() => setOption(1)}>Display</option>
                                <option onClick={() => setOption(2)}>DisplayChart</option>
                            </Input>
                        </FormGroup>

                    </div>
                </div>
                
                {
                    renderOption()
                }
            
        
            </CardBody>
        </Card>

    

    </div>

</>
)
}
