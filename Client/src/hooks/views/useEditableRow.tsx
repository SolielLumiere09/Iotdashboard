import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from 'contexts/app/Generalvariables';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';
import { ComponentProps } from '../../components/app/Widget';
import { AuthContext } from 'contexts/app/AuthContext';




interface DataToSend{
    widgetId : string 
    props : ComponentProps
}

interface Response {
    msg : string 
    accepted : boolean
}


export const useEditableRow = (widgetId : string, props : ComponentProps) => {
    const [rowState, setRowState] = useState(props)

    const [editView, setEditView] = useState(false)
    const {register, handleSubmit} = useForm<ComponentProps>()
    const {openNotification} = useContext(NotificationContextProvider)
    const [visible, setVisible] = useState(true)
    const {authContextState} = useContext(AuthContext)
    
    const saveValues = async (formData : ComponentProps) => {
        try{
            if(editView){
                console.log(JSON.stringify(formData, null, 3));
                
                const dataToSend : DataToSend = {
                    widgetId,
                    props : formData
                }
            
                const {data} = await axiosInstance.post<Response>('/api/updateWidget', dataToSend, {
                    headers : {
                        "auth-token" : authContextState.token
                    }
                })
    
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
