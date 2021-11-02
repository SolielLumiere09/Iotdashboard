import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface Response {
    accepted: boolean;
    token:    string;
}

interface fields {
    userName : string 
    password : string
}


export const useLogin = () => {
    const { register, handleSubmit } = useForm<fields>();
    const [openNotification, setOpenNotification] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory()
    const notify = useRef(null)

    
    const options = useMemo(() => {
        return {
            place : 'tc',
            message,
            type : 'danger',
            icon : 'tim-icons icon-bell-55',
            autoDismiss : 5,
            closeButton : true
        }
    }, [message])

    const openNotify = useCallback(() => {
        if(notify.current !== null)
            notify.current.notificationAlert(options)
     }, [options])

    useEffect(() => {
        if(openNotification){
            openNotify()
            setOpenNotification(false)
        }
    }, [openNotification, openNotify])



    const handleLogin = async (data : fields) => {
        const {password,userName} = data
        console.log("requesting...")
        try{
            const {data} = await axios.get<Response>('http://localhost:3001/loginUser', {
                params : {
                    userName,
                    password
                }
            })

            if(data.accepted){
                console.log(data)
                history.push('/admin/dashboard')
                setOpenNotification(false)
            }else {
                //show a message because the password or username is incorrec
                setMessage('Please verify your username or password')
                setOpenNotification(true)
            }

            console.log(data)
        }catch(e){
            //The endpoint doesn't exists
            setMessage('Conexion Error! Please try again later')
            setOpenNotification(true)
        }

    }


    return {
        register,
        handleSubmit,
        handleLogin,
        notify,
    }
}
