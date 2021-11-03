import React from 'react'
import background from 'assets/img/card-info.png'
import { Card, CardBody, CardText, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Notify from 'react-notification-alert';
import { useRef } from 'react';
import { useNotification } from '../../hooks/useNotification';

interface Response {
    msg : string,
    accepted : boolean
}

interface fields {
    userName : string 
    password : string
}



export const Register = () => {
    const history = useHistory()
    const { register, handleSubmit } = useForm<fields>();
    const notification = useRef(null)
    const {openNotification} = useNotification(notification)


    const style : React.CSSProperties = {
        position : 'absolute',
        top : '50%',
        left : '50%',
        transform : 'translate(-50%,-50%)',
        backgroundImage : `url(${background})`,
        backgroundRepeat : 'no-repeat'
    }


    const handleRegister = async (formData : fields) => {
        
        try{
            const {password, userName} = formData
        
            const {data} = await axios.post<Response>('http://localhost:3001/userRegister', {
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


    return (
        <>
            <Card className="col col-12 col-sm-8 col-md-6 col-lg-6 col-xl-3" style={style}>
                <CardBody className='p-4'>
                    <CardText className='text-center h1 mt-5'>IOT Dashboard</CardText>
                    <CardText className='text-center h1 mt-5'>Register</CardText>
                    <input {...register("userName")}className="form-control form-text" placeholder="Username" style={{marginTop : '40%'}}/>
                    
                    <input {...register("password")} type='password' className="form-control form-text mt-3" placeholder="Password" />
                    
                    <div className='d-flex justify-content-around'>
                    <Button color="primary" className="mt-3" onClick={() => history.push("/Login")}>Login</Button>
                        <Button color="info" className="mt-3" onClick={handleSubmit(handleRegister)}>Register</Button>
                    
                    </div>
    
                </CardBody>
            </Card>
            <Notify ref={notification}/>
    </>
    )
}
