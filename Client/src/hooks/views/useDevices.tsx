import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';
import { useState, useContext } from 'react';
import { AuthContext } from 'contexts/app/AuthContext';
import { axiosInstance } from 'contexts/app/Generalvariables';


export interface Response {
    _id:        string;
    userId:     string;
    deviceId:   string;
    deviceName: string;
    username:   string;
    password:   string;
    subscribe:  string;
    publish:    string;
    __v:        number;
}


interface CreateDeviceResponse {
    msg : string,
    accepted : boolean
}

interface FormData {
    deviceId:   string;
    deviceName: string;
    username:   string;
    password:   string;
}

export const useDevices = () => {
    const [rows, setRows] = useState<Response[]>([])
    const {handleSubmit, register} = useForm<FormData>()
    const {authContextState} = useContext(AuthContext)
    const {openNotification} = useContext(NotificationContextProvider)

    const sizeOfInputs = {
        xs : 12,
        sm : 12,
        md : 6,
        lg : 6,
        xl : 3
    }

    
    useEffect(() => {
        const fillRows = async () => {
            try{
    
                const {data} = await axiosInstance.get<Response[]>('/api/getDevices', {
                    params : {
                        userId : authContextState.userId
                    },
                    headers : {
                        "auth-token" : authContextState.token
                    }
                })
    
               
    
                setRows(data)
    
            }catch(e){  
                
            }
    
    
        }
        fillRows()
        
    }, [authContextState.userId, authContextState.token])

    const clickHandler = async (formData : FormData) => {

        try {
            
            const {data} = await axiosInstance.post<CreateDeviceResponse>('/api/addDevice', {
                ...formData,
                userId : authContextState.userId
            }, {
                headers : {
                    "auth-token" : authContextState.token
                }
            })

            openNotification(data.msg, data.accepted ? 'success' : 'warning')
            
            if(data.accepted) {
                setRows(value => {

                    const newValue = [...value]
                    newValue.push({
                        __v : 0,
                        _id : '',
                        deviceId : formData.deviceId,
                        deviceName : formData.deviceName,
                        password : formData.password,
                        publish : '#',
                        subscribe : '#',
                        userId : authContextState.userId,
                        username : formData.username
                    })
        
                    return newValue
                })
            }

        } catch (error) {
            openNotification("Server error", "danger")
        }



  
        
    }
    
    
    return {
        sizeOfInputs,
        register,
        handleSubmit,
        clickHandler,
        rows
    }
}
