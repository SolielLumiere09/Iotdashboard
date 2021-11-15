import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from 'contexts/app/Generalvariables';
import { AuthContext } from 'contexts/app/AuthContext';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';

interface Props {
    deviceId:   string,
    deviceName: string,
    username:   string,
    password:   string
}

interface Response {
    msg : string 
    accepted : boolean
}

export const useDeviceRow = (props : Props) => {
    const {register, handleSubmit} = useForm<Props>()
    const [editView, setEditView] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [rowState, setRowState] = useState(props)
    const {authContextState} = useContext(AuthContext)
    const {openNotification} = useContext(NotificationContextProvider)
    const {deviceId, deviceName, password, username} = rowState
    
    const onSave = async (formData : Props) => {

        if(editView){
            

            try{
    
                const {data} = await axiosInstance.post<Response>("/api/updateDevice", formData, {
                    headers : {
                        'auth-token' : authContextState.token
                    }
                })
    
                if(data.accepted){
                    setRowState(formData)
                    openNotification(data.msg, "success")
                    setEditView(false)
                }else {
                    openNotification(data.msg, "warning")
                }
    
    
            }catch{
                openNotification("Server Error", "danger")
            }


        }

       
    }

    const onChangeView = async () => {
        setEditView(true)
    }

    const onDelete = async () => {  

        try {

            const {data} = await axiosInstance.post<Response>('/api/deleteDevice', {
                deviceId
            }, {
                headers : {
                    'auth-token' : authContextState.token
                }
            })

            openNotification(data.msg, !data.accepted ? 'success' : 'warning')
            setIsHidden(!data.accepted)
            
        } catch (error) {
            openNotification("Server Error", "danger")
        }   

        
    }

    
    
    
    return {
        isHidden,
        deviceId,
        deviceName,
        username,
        password,
        editView,
        register,
        handleSubmit,
        onChangeView,
        onSave,
        onDelete,

    }
}
