import React from 'react'
import { Button } from 'reactstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


/*
userId:     string,
    deviceId:   string,
    deviceName: string,
    username:   string,
    password:   string,
*/

interface Props {
    deviceId:   string,
    deviceName: string,
    username:   string,
    password:   string
}

export const DeviceRow = (props : Props) => {
    
    const {register, handleSubmit} = useForm<Props>()
    const [editView, setEditView] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [rowState, setRowState] = useState(props)
    const {deviceId, deviceName, password, username} = rowState
    
    const onSave = async (formData : Props) => {
        console.log(formData);
        setEditView(false)
    }

    const onChangeView = async () => {
        setEditView(true)
    }

    const onDelete = async () => {  
        setIsHidden(true)
    }

    return (

        <>
          
            { 
            !isHidden &&  
            (<tr key={deviceId}>
                <td>{!editView ? deviceId : <input readOnly defaultValue={deviceId} className="form-control" placeholder="DeviceId" {...register("deviceId")}/>}</td>
                <td>{!editView ? deviceName : <input defaultValue={deviceName} className="form-control" placeholder="deviceName" {...register("deviceName")}/>}</td>
                <td>{!editView ? username : <input defaultValue={username} className="form-control" placeholder="username" {...register("username")}/>}</td>
                <td>{!editView ? password : <input defaultValue={password} className="form-control" placeholder="password" {...register("password")}/>}</td>
                <td className="">
                    <Button className="btn-icon" color="info" size="sm" onClick = {handleSubmit(onSave)}>
                        <i className="fa fa-check"></i>
                    </Button>{` `}
                    <Button className="btn-icon" color="success" size="sm" onClick = {onChangeView}>
                        <i className="fa fa-edit"></i>
                    </Button>{` `}
                    <Button className="btn-icon" color="danger" size="sm"  onClick = {onDelete}>
                        <i className="fa fa-times" />
                    </Button>
                </td>
            </tr>)}
        </>
    )
}


export type {Props as DeviceRowProps}