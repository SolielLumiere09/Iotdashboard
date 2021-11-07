import { Row, Col, Button } from 'reactstrap';
import { InputField } from './InputField'
import {Props as DisplayMqttProps} from '../Mqtt/DisplayMqtt'
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from 'contexts/app/AuthContext';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';
import { Display, DisplayProps } from '../Display';
import moment from 'moment';
import { Response, WidgetDBprops, axiosInstance } from 'contexts/app/Generalvariables';


interface FormFields extends DisplayMqttProps{
    xs : number 
    sm : number 
    md : number 
    lg : number 
    xl : number
}

export const DisplayForm = () => {
    const {register, watch, handleSubmit} = useForm<FormFields>()
    const {authContextState} = useContext(AuthContext)
    const {openNotification} = useContext(NotificationContextProvider)
    const [formState, setFormState] = useState<DisplayProps>({
        date : moment().format('MMMM Do YYYY, h:mm:ss a'),
        measure : 100,
        title : 'Preview',
        unit :'C'

    })


    const size = {
        xs : 12,
        sm : 12,
        md : 12,
        lg : 6,
        xl : 6
    }

    const sizeProperties = useMemo(() => {
        return {
            xs : 4,
            sm : 3,
            md : 3,
            lg : 3,
            xl : 3,
            
        }
    }, [])


    useEffect(() => {
        const subscription = watch((value) => {
            setFormState({
                date : moment().format('MMMM Do YYYY, h:mm:ss a'),
                measure : 100,
                title : value.title,
                unit : value.unit
            })
        })


        return () => {
            subscription.unsubscribe()
        }
    }, [watch])

    const clickHandler = async (formData : FormFields) => {
        try{

            const payloadToSend : WidgetDBprops = {
                widgetId : formData.widgetId,
                userId : authContextState.userId,
                type : 'DisplayMqtt',
                size : {
                    xs : formData.xs,
                    sm : formData.sm,
                    md : formData.md,
                    lg : formData.lg,
                    xl : formData.xl,
                },
                props : {
                    widgetId : formData.widgetId,
                    title : formData.title,
                    unit : formData.unit,
                    topicToSubscribe : formData.topicToSubscribe,
                    property : formData.property
                }
            }

            const {data} = await axiosInstance.post<Response>('/api/addWidget', payloadToSend)
            
            if(data.accepted){
                openNotification(data.msg)
            }else {
                openNotification(data.msg)
            }

            

        }catch(e){
            openNotification("Server Error")
        }
    }


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


                        <Col xs={12}>
                            <Button onClick={handleSubmit(clickHandler)}>Save</Button>
                        </Col>

                    </Row>
                </Col>
                <Col lg={4} className='offset-lg-1'>
                    <Display {...formState}/>
                </Col>

            </Row>
           
        </>
    )
}
