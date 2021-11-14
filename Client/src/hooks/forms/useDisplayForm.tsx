import { Response, WidgetDBprops, axiosInstance } from 'contexts/app/Generalvariables';
import {Props as DisplayMqttProps} from '../../components/app/Mqtt/DisplayMqtt'
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/app/AuthContext';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';
import moment from 'moment';
import { DisplayProps } from 'components/app/Display';


interface FormFields extends DisplayMqttProps{

}

export const useDisplayForm = () => {
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
                props : {
                    widgetId : formData.widgetId,
                    title : formData.title,
                    unit : formData.unit,
                    topicToSubscribe : formData.topicToSubscribe,
                    property : formData.property
                }
            }

            const {data} = await axiosInstance.post<Response>('/api/addWidget', payloadToSend, {
                headers : {
                    "auth-token" : authContextState.token
                }
            })
            
            if(data.accepted){
                openNotification(data.msg)
            }else {
                openNotification(data.msg)
            }

            

        }catch(e){
            openNotification("Server Error")
        }
    }
    
    
    return {
        register,
        size,
        formState,
        handleSubmit,
        clickHandler
    }
}
