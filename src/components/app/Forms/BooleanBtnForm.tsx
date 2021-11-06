import React from 'react'
import { FormGroup, Row, Col, Button } from 'reactstrap';
import { InputField } from './InputField';


/*

                    
                    
                   
                    
*/

export const BooleanBtnForm = () => {

    const size = {
        xs : 12,
        sm : 6,
        md : 6,
        lg : 6,
        xl : 6
    }

    return (
        
        <form>
            <Row>
                
                <InputField
                    size={size}
                    label={'DeviceId'}
                    placeholder="Enter DeviceId"
                    type='text'
                />
                <InputField
                    size={size}
                    label={'Title'}
                    placeholder="Enter a widget Title"
                    type='text'
                />
                <InputField
                    size={size}
                    label={'IconSize'}
                    placeholder="Enter the size of the icon"
                    type='text'
                />
                <InputField
                    size={size}
                    label={'IconName'}
                    placeholder="Enter the icon to display"
                    type='text'
                />
                <InputField
                    size={size}
                    label={'Topic To Publish'}
                    placeholder="Enter the topic to publish"
                    type='text'
                />
                <InputField
                    size={size}
                    label={'Property to send'}
                    placeholder="Enter the property to send the message"
                    type='text'
                />

                <Col xs={12}>
                    <Button type='button' color='primary'>Save</Button>
                
                </Col>

            </Row>
        </form>
            
        
    )
}
