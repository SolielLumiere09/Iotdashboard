import { Row, Col, Button } from 'reactstrap';
import { InputField } from './InputField';
import { BooleanBtn } from '../BooleanBtn';
import { useBooleanBtnForm } from '../../../hooks/useBooleanBtnForm';
import { BackgroundColorContext, classMappingColors } from 'contexts/core/BackgroundColorContext';


export const BooleanBtnForm = () => {
    const {btnState, clickHandler, handleSubmit, register, size, sizeProperties} = useBooleanBtnForm()
    

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
                    size={size}
                    label={'Topic To Publish'}
                    placeholder="Enter the topic to publish"
                    type='text'
                    register={register('Topic')}
                />
                <InputField
                    size={size}
                    label={'Property to send'}
                    placeholder="Enter the property to send the message"
                    type='text'
                    register={register('Property')}
                />

                <Col xs={12}/>

                <InputField
                    size={sizeProperties}
                    label={'X-Small'}
                    placeholder="xs"
                    type='number'
                    register={register('xs')}
                />
                <InputField
                    size={sizeProperties}
                    label={'small'}
                    placeholder="sm"
                    type='number'
                    register={register('sm')}
                />
                <InputField
                    size={sizeProperties}
                    label={'medium'}
                    placeholder="md"
                    type='number'
                    register={register('md')}
                />
                <InputField
                    size={sizeProperties}
                    label={'large'}
                    placeholder="lg"
                    type='number'
                    register={register('lg')}
                />
                <InputField
                    size={sizeProperties}
                    label={'x-large'}
                    placeholder="xl"
                    type='number'
                    register={register('xl')}
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
            <Col lg={4} className={'mt-5 offset-lg-1'}>

               <BooleanBtn
                  {...btnState}
               />
            </Col>
        </Row>

    )
}
