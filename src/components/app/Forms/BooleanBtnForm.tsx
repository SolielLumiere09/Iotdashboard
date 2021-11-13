import { Row, Col, Button } from 'reactstrap';
import { InputField } from './InputField';
import { BooleanBtn } from '../BooleanBtn';
import { useBooleanBtnForm } from '../../../hooks/forms/useBooleanBtnForm';
import { BackgroundColorContext, classMappingColors } from 'contexts/core/BackgroundColorContext';


export const BooleanBtnForm = () => {
    const {btnState, clickHandler, handleSubmit, register, size} = useBooleanBtnForm()
    

    const renderInputs = () => {
        return (
            <>
                <InputField
                    size={size}
                    label={'WidgetId'}
                    placeholder="Enter a widget identifier"
                    type='text'
                    register={register('widgetId')}
                />
                <InputField
                    size={size}
                    label={'Title'}
                    placeholder="Enter a widget Title"
                    type='text'
                    register={register('title')}
                />
                <InputField
                    size={size}
                    label={'IconSize'}
                    placeholder="Enter the size of the icon"
                    type='text'
                    register={register('iconSize')}
                />
                <InputField
                    size={size}
                    label={'IconName'}
                    placeholder="Enter the icon to display"
                    type='text'
                    register={register('IconName')}
                />
                <InputField
                    size={{...size, xl : 12}}
                    label={'Topic To Publish'}
                    placeholder="Enter the topic to publish"
                    type='text'
                    register={register('Topic')}
                />
            
                <InputField
                    size={size}
                    label={'Payload when On'}
                    placeholder="Enter the property to send the message"
                    type='textarea'
                    register={register('payloadWhenOn')}
                />
                 <InputField
                    size={size}
                    label={'Payload when Off'}
                    placeholder="Enter the property to send the message"
                    type='textarea'
                    register={register('payloadWhenOff')}
                />
            
            
                <Col xs={12}>
                <BackgroundColorContext.Consumer>
                {({color}) => ( 
                    <Button type='button' color={classMappingColors[color]} onClick={handleSubmit(clickHandler)}>Save</Button>
                )}
                </BackgroundColorContext.Consumer>
                </Col>

            </>
        )
    }
 
    return (
        <Row>
            <Col lg={6}>
                <Row>
                    {renderInputs()}

                </Row>
            
            </Col>
            <Col lg={4} className={'offset-lg-1'}>

               <BooleanBtn
                  {...btnState}
               />
            </Col>
        </Row>

    )
}
