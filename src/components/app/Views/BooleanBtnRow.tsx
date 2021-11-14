import React from 'react'
import {Props as BooleanMqttProps} from 'components/app/Mqtt/BooleanBtnMqtt'
import { Button } from 'reactstrap';
import { useEditableRow } from 'hooks/views/useEditableRow';

export const BooleanBtnRow = ({iconName, iconSize, payloadWhenOff, payloadWhenOn, publishTopic, title, widgetId} : BooleanMqttProps) => {
    
    const { deleteWidget, 
            editView, 
            enableEdit, 
            handleSubmit, 
            visible, 
            saveValues, 
            rowState,
            register 
            } = useEditableRow(widgetId, 
            {

                widgetId,
                title,
                iconName,
                iconSize,
                payloadWhenOff,
                payloadWhenOn,
                publishTopic
                
            })  



    return (
        <>
        
            {
            visible &&
            (<tr>
                <td>{!editView ? (rowState as BooleanMqttProps).widgetId : <input type="text" placeholder="widgetId" defaultValue={(rowState as BooleanMqttProps).widgetId} readOnly className="form-control" {...register("widgetId")}/>}</td>
                <td>{!editView ? (rowState as BooleanMqttProps).title : <input type="text" placeholder="Title" defaultValue={(rowState as BooleanMqttProps).title} className="form-control" {...register("title")}/>}</td>
                <td className="text-left"> {!editView ? (rowState as BooleanMqttProps).iconSize! : <input type="text" placeholder="iconSize" defaultValue={(rowState as BooleanMqttProps).iconSize} className="form-control" {...register("iconSize")}/>}</td>
                <td className="text-left"> {!editView ? (rowState as BooleanMqttProps).iconName : <input type="text" placeholder="iconName" defaultValue={(rowState as BooleanMqttProps).iconName} className="form-control" {...register("iconName")}/>}</td>
                <td className="text-left"> {!editView ? (rowState as BooleanMqttProps).publishTopic : <input type="text" placeholder="publishTopic" defaultValue={(rowState as BooleanMqttProps).publishTopic} className="form-control" {...register("publishTopic")}/>}</td>
                <td className="text-left"> {!editView ? (rowState as BooleanMqttProps).payloadWhenOn : <input type="text" placeholder="payloadWhenOn" defaultValue={(rowState as BooleanMqttProps).payloadWhenOn} className="form-control" {...register("payloadWhenOn")}/>}</td>
                <td className="text-left"> {!editView ? (rowState as BooleanMqttProps).payloadWhenOff : <input type="text" placeholder="payloadWhenOff" defaultValue={(rowState as BooleanMqttProps).payloadWhenOff} className="form-control" {...register("payloadWhenOff")}/>}</td>
                <td className="text-left">
                    <Button className="btn-icon" color="info" size="sm" onClick={handleSubmit(saveValues)}>
                        <i className="fa fa-check"></i>
                    </Button>{` `}
                    <Button className="btn-icon" color="success" size="sm" onClick={() => enableEdit()}>
                        <i className="fa fa-edit"></i>
                    </Button>{` `}
                    <Button className="btn-icon" color="danger" size="sm" onClick={() => deleteWidget()}>
                        <i className="fa fa-times" />
                    </Button>
                </td>
            </tr>)}
        
        
        </>
    )
}
