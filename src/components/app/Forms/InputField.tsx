import React from 'react'
import { Col, Label, FormGroup } from 'reactstrap';
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
    register? : any
}

export const InputField = ({label, placeholder, size, type, register} : Props) => {
    return (
        <Col {...size}>
            <Label className='control-label'>{label}</Label>
            <FormGroup>
                <input
                    
                    className='form-control from-text'
                    {...register}
                    type={type}
                    placeholder={placeholder}
                />    
            </FormGroup>
        
        </Col>
    )
}
