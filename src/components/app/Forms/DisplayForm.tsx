import { Row, Col, Button } from 'reactstrap';
import { InputField } from './InputField'
import { Display } from '../Display';
import { BackgroundColorContext, classMappingColors} from 'contexts/core/BackgroundColorContext';
import { useDisplayForm } from '../../../hooks/forms/useDisplayForm';




export const DisplayForm = () => {

    const {register, size, sizeProperties, formState, handleSubmit, clickHandler} = useDisplayForm()


    return (
        <>
            <Row>
                <Col lg={6}>
                    <Row>
                        <InputField
                            label="widgetId"
                            placeholder="Introduce a widgetId"
                            size={size}
                            type={'text'}
                            register={register('widgetId')}
                        /> 
                        <InputField
                            label="Title"
                            placeholder="Introduce a Title"
                            size={size}
                            type={'text'}
                            register={register('title')}
                        /> 
                        <InputField
                            label="Unit"
                            placeholder="Introduce a unit measure"
                            size={size}
                            type={'text'}
                            register={register('unit')}
                        /> 
                        <InputField
                            label="Topic To Subscribe"
                            placeholder="Introduce a listening topic"
                            size={size}
                            type={'text'}
                            register={register('topicToSubscribe')}
                        /> 
                         <InputField
                            label="Property to listen"
                            placeholder="Introduce a property"
                            size={size}
                            type={'text'}
                            register={register('property')}
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


                        <BackgroundColorContext.Consumer>
                            {({color}) => (
                                
                                <Col xs={12}>
                                    <Button color={classMappingColors[color]} onClick={handleSubmit(clickHandler)}>Save</Button>
                                </Col>
                                
                            )}
                        </BackgroundColorContext.Consumer>
                        

                    </Row>
                </Col>
                <Col lg={4} className='offset-lg-1'>
                    <Display {...formState}/>
                </Col>

            </Row>
           
        </>
    )
}
