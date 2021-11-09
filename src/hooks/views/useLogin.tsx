import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from 'contexts/app/AuthContext';
import { APP_LOGIN_STATUS, axiosInstance } from 'contexts/app/Generalvariables';
import { NotificationContextProvider } from "contexts/app/NotificationContext";

export interface Response {
    accepted: boolean;
    token:    string;
    msg : string
    userId : string
}

interface fields {
    userName : string 
    password : string
}

export const useLogin = () => {
    const { register, handleSubmit } = useForm<fields>();
    const history = useHistory()
    const authContext = useContext(AuthContext)
    const {openNotification} = useContext(NotificationContextProvider)


    const handleLogin = async (formFields : fields) => {
        try{
            const {password,userName} = formFields
            
           
            const {data} = await axiosInstance.get<Response>('/loginUser', {
                params : {
                    userName,
                    password
                }
            })

            if(data.accepted){
                
                const state = {
                    isLoged : true,
                    token : data.token,
                    userId : data.userId
                }

                authContext.setState(state)
                window.localStorage.setItem(APP_LOGIN_STATUS, JSON.stringify(state))
                history.push('/admin/dashboard')
              
            }else {    
                openNotification("Verify your username and password")
            }

            
        }catch(e){
            openNotification("Error reaching the server")
        }

    }


    return {
        register,
        handleSubmit,
        handleLogin,
    }
}
