import React from 'react'
import { Row, Col, Button } from 'reactstrap';
import { DisplayChart } from '../DisplayChart';
import { useMemo, useEffect, useState } from 'react';
import { InputField } from './InputField';
import { useForm } from 'react-hook-form';
import { BackgroundColorContext, classMappingColors } from 'contexts/core/BackgroundColorContext';
import moment from 'moment';

interface Fields {
    widgetId : string
    title : string,
    unit : string, 
    fieldNumber : number
    topicToSubscribe : string 
    property : string
}

interface FormStatus {
    widgetId : string
    title : string,
    unit : string, 
    fieldNumber : number
    date : string
}


export const DisplayChartForm = () => {

    const {register, watch, handleSubmit} = useForm<Fields>()
    const [formStatus, setFormStatus] = useState<FormStatus>({
        widgetId : '123123',
        title : 'test',
        unit : 'C',
        date : moment().format('MMMM Do YYYY, h:mm:ss a'),
        fieldNumber : 5
    })
    
    const size = useMemo(() => {    
        return {
            xs : 12,
            sm : 6,
            md : 6,
            lg : 6,
            xl : 6
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value) => {

            setFormStatus({
                widgetId : '11212',
                title : value.title,
                unit : value.unit,
                fieldNumber : value.fieldNumber,
                date : moment().format('MMMM Do YYYY, h:mm:ss a'),
                
            })
        })


        return () => {
            subscription.unsubscribe()
        }
    }, [watch])


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
                    label={'title'}
                    placeholder="Enter a title"
                    type='text'
                    register={register('title')}
                />

                 <InputField
                    size={size}
                    label={'unit'}
                    placeholder="Enter a unit"
                    type='text'
                    register={register('unit')}
                />

               <InputField
                    size={size}
                    label={'Topic to subscribe'}
                    placeholder="Enter a topic"
                    type='text'
                    register={register('topicToSubscribe')}
                />

                <InputField
                    size={size}
                    label={'Property'}
                    placeholder="Enter a property"
                    type='text'
                    register={register('property')}
                />

                <InputField
                    size={size}
                    label={'Number of fields'}
                    placeholder="Enter number of fields"
                    type='number'
                    register={register('fieldNumber')}
                />

                <Col xs={12}/>
                        
                <BackgroundColorContext.Consumer>
                    {({color}) => (
                        
                        <Col xs={12}>
                            <Button color={classMappingColors[color]}>Save</Button>
                        </Col>
                        
                    )}
                </BackgroundColorContext.Consumer>
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
                <DisplayChart
                   title = {formStatus.title}
                   unit = {formStatus.unit}
                   data = {Array.from(Array(Number(formStatus.fieldNumber)).keys())}
                   labels = {Array.from(Array(Number(formStatus.fieldNumber)).keys()).map(value => String(value))}
                   measure={12}
                   date={formStatus.date}
                />
            </Col>
        </Row>
    )
}
