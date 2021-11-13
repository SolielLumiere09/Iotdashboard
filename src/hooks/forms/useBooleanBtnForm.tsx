import { useMemo, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'contexts/app/AuthContext';
import { Props as BooleanBtnProps } from '../../components/app/BooleanBtn';
import { Response, WidgetDBprops, axiosInstance } from 'contexts/app/Generalvariables';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';


interface Fields {
    widgetId : string
    title : string
    iconSize : string 
    IconName : string
    Topic : string
    payloadWhenOff : string
    payloadWhenOn : string
}




export const useBooleanBtnForm = () => {
    const {handleSubmit, register, watch } = useForm<Fields>()
    const {authContextState} = useContext(AuthContext)
    const {openNotification} = useContext(NotificationContextProvider)

    const [btnState, setBtnState] = useState<BooleanBtnProps>({
        iconName : 'AiFillAlert',
        iconSize : '5em',
        onClick : () => {},
        title : 'Preview',
        widgetId : 'Preview'
    })


    useEffect(() => {
        
        const subscription = watch((value) => {
            setBtnState({
                title : value.title,
                iconName : value.IconName,
                iconSize : value.iconSize,
                onClick : () => {},
                widgetId : value.widgetId
            })
        });

        return () => {
            subscription.unsubscribe()
        }
    }, [watch])
    const size = useMemo(() => {    
        return {
            xs : 12,
            sm : 6,
            md : 6,
            lg : 6,
            xl : 6
        }
    }, [])


    const clickHandler = async (formData : Fields) => {
        console.log(authContextState);
        console.log(formData);
        
        try{
            const widgetPropertyToSend : WidgetDBprops = {
                userId : authContextState.userId,
                widgetId : formData.widgetId,
                type : 'BooleanBtnMqtt',
                props : {
                    widgetId : formData.widgetId,
                    title : formData.title ,
                    iconSize : formData.iconSize, 
                    iconName : formData.IconName,
                    publishTopic : formData.Topic,
                    payloadWhenOn : formData.payloadWhenOn,
                    payloadWhenOff : formData.payloadWhenOff
                }
                
            }
            
            const {data} = await axiosInstance.post<Response>("/api/addWidget", widgetPropertyToSend)


            if(data.accepted){
                
                openNotification("device Registered successfull --> " + data.msg, 'success')
            }else {
                openNotification("can't register device --> " + JSON.stringify(data.msg), 'warning')
            
            }

        }catch(e){
            openNotification("Please fill correctly the fileds", 'danger')
            console.log("error", e);
            
        }
        
    }

 
    
    
    return {

        handleSubmit,
        register,
        btnState,
        clickHandler,
        size
    }
}
