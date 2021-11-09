import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { NotificationContextProvider } from 'contexts/app/NotificationContext';
import { axiosInstance } from 'contexts/app/Generalvariables';

interface Response {
    msg : string,
    accepted : boolean
}

interface fields {
    userName : string 
    password : string
}


export const useRegister = () => {
    const {openNotification} = useContext(NotificationContextProvider)
    const { register, handleSubmit } = useForm<fields>();

    const handleRegister = async (formData : fields) => {
        
        try{
            const {password, userName} = formData
        
            const {data} = await axiosInstance.post<Response>('/userRegister', {
                userName,
                password
            })

            if(data.accepted){
                openNotification(data.msg)
            }
            else {
                openNotification(data.msg)
            }


        }catch(e){
           openNotification("Can't connect to the server")
        }
     
    }

    
    
    
    return {
        register,
        handleSubmit,
        handleRegister
    }
}
