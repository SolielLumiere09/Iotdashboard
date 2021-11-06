import React from 'react'
import { Col, Label, Input, FormGroup } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

interface Props {
    size : {
        xs : number,
        sm : number,
        md : number,
        lg : number 
        xl : number
    }
    label : string,
    type : InputType
    placeholder : string    
}

export const InputField = ({label, placeholder, size, type} : Props) => {
    return (
        <Col {...size}>
            <Label className='control-label'>{label}</Label>
            <FormGroup>
                <Input
                    type={type}
                    placeholder={placeholder}
                />    
            </FormGroup>
        
        </Col>
    )
}
