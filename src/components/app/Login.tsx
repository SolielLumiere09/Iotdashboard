import React from 'react'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import background from 'assets/img/card-primary.png'
import { useLogin } from '../../hooks/useLogin';
import Notify from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";

export const Login = () => {
    const {handleSubmit, register, handleLogin, notify} = useLogin()

    const style : React.CSSProperties = {
        position : 'absolute',
        top : '50%',
        left : '50%',
        transform : 'translate(-50%,-50%)',
        backgroundImage : `url(${background})`,
        backgroundRepeat : 'no-repeat'
     }


    return (
        <>
            <Card className="col col-12 col-sm-8 col-md-6 col-lg-6 col-xl-3" style={style}>
                <CardBody className='p-4'>
                    <CardText className='text-center h1 mt-5'>IOT Dashboard</CardText>
                    <input {...register('userName')} className="form-control form-text" placeholder="Username" style={{marginTop : '40%'}}/>
                    
                    <input {...register('password')} type='password' className="form-control form-text mt-3" placeholder="Password" />
                    
                    <div className='d-flex justify-content-around'>
                        <Button color="primary" className="mt-3" onClick={handleSubmit(handleLogin)}>Login</Button>
                        <Button color="info" className="mt-3 " >Register</Button>
                    </div>

            
                    
                </CardBody>
            </Card>
            <Notify ref={notify}/>
        </>
    )
}
