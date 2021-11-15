import { Button} from 'reactstrap';
import { useDeviceRow } from '../../../hooks/views/useDeviceRow';
import { CustomModal } from '../CustomModal';
import { useState } from 'react';



interface Props {
    deviceId:   string,
    deviceName: string,
    username:   string,
    password:   string
}



export const DeviceRow = (props : Props) => {
    const {deviceId,deviceName,handleSubmit,isHidden,onChangeView,onDelete,onSave,password,register, username, editView} = useDeviceRow(props)
    const [isOpen, setIsOpen] = useState(false)
    return (

        <>

            <CustomModal
                isOpen = {isOpen}
                setIsOpenModal = {setIsOpen}
                modalBody = {`Are you sure you want to delete ---> ${deviceName}`}
                modalHeader ={"Warning"}
                onAccept = {onDelete}
                
            />
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
                    <Button className="btn-icon" color="danger" size="sm"  onClick = {() => {
                        setIsOpen(true)
                    }}>
                        <i className="fa fa-times" />
                    </Button>
                </td>
            </tr>)}
        </>
    )
}


export type {Props as DeviceRowProps}