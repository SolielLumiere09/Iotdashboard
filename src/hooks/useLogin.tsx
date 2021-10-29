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
    const history = useHistory()
    const notify = useRef(null)

    
    const options = useMemo(() => {
        return {
            place : 'tc',
            message : 'Please verify your username or password',
            type : 'danger',
            icon : 'tim-icons icon-bell-55',
            autoDismiss : 5,
            closeButton : true
        }
    }, [])

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
        try{
            const {data} = await axios.get<Response>('http://localhost:3001/loginUser', {
                params : {
                    userName,
                    password
                }
            })

            if(data.accepted){
                history.push('/admin/dashboard')
                setOpenNotification(false)
            }else {
                //show a message because the password or username is incorrec
                setOpenNotification(true)
            }

            console.log(data)
        }catch(e){
            //The endpoint doesn't exists
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
