import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from 'contexts/app/Generalvariables';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';
import {Props} from 'components/app/Mqtt/BooleanBtnMqtt'

interface DataToSend{
    widgetId : string 
    props : Props
}

interface Response {
    msg : string 
    accepted : boolean
}

export const useBooleanBtnRow = (iconName, iconSize, payloadWhenOff, payloadWhenOn, publishTopic, title, widgetId) => {
    const [rowState, setRowState] = useState({
        iconName,
        iconSize,
        payloadWhenOff,
        payloadWhenOn,
        publishTopic,
        title,
        widgetId
    })
    const [editView, setEditView] = useState(false)
    const {register, handleSubmit} = useForm<Props>()
    const {openNotification} = useContext(NotificationContextProvider)
    const [visible, setVisible] = useState(true)
    
    const saveValues = async (formData : Props) => {
        try{
            if(editView){
                const dataToSend : DataToSend = {
                    widgetId,
                    props : formData
                }
            
                const {data} = await axiosInstance.post<Response>('/api/updateWidget', dataToSend)
    
                if(data.accepted){
                    setRowState(formData)
                    openNotification(data.msg, "success")
                    
                }
                else {
                    openNotification(data.msg, "warning")
                }
    
                
            }

        }catch(e){

        }
  
        
        setEditView(false)
        
    }

    const enableEdit = () => {
        setEditView(true)
    }

    const deleteWidget = async () => {
        try {

            const {data} = await axiosInstance.post<Response>('/api/deleteWidget', {
                widgetId
            })

            if(data.accepted){
                openNotification(data.msg, "success")
                setVisible(false)
            }else {
                openNotification(data.msg, "warning")
            }


        } catch (error) {
            
        }
    }
    
    return {
        visible,
        editView,
        rowState,
        handleSubmit,
        enableEdit,
        deleteWidget,
        saveValues,
        register
    }
}
