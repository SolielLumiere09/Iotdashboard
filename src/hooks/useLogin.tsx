import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNotification } from './useNotification';

export interface Response {
    accepted: boolean;
    token:    string;
}

interface fields {
    userName : string 
    password : string
}

export const useLogin = (ref :  React.MutableRefObject<any>) => {
    const { register, handleSubmit } = useForm<fields>();
    const {openNotification} = useNotification(ref);
    const history = useHistory()


    const handleLogin = async (formFields : fields) => {
        try{
            const {password,userName} = formFields
            
            console.log("requesting...")
            const {data} = await axios.get<Response>('http://localhost:3001/loginUser', {
                params : {
                    userName,
                    password
                }
            })

            if(data.accepted){
                console.log(data)
                history.push('/admin/dashboard')
               
              
            }else {    
              openNotification("Verify your username and password")
            }

            console.log(data)
        }catch(e){
            openNotification("Can't connect to the server")
        }

    }


    return {
        register,
        handleSubmit,
        handleLogin,
    }
}
