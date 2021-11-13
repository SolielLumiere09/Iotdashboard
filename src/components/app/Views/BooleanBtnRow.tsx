import React from 'react'
import {Props} from 'components/app/Mqtt/BooleanBtnMqtt'
import { Button } from 'reactstrap';
import { useBooleanBtnRow } from 'hooks/views/useBooleanBtnRow';

export const BooleanBtnRow = ({iconName, iconSize, payloadWhenOff, payloadWhenOn, publishTopic, title, widgetId} : Props) => {
    const {deleteWidget, editView, enableEdit, handleSubmit, rowState, visible, saveValues, register} = useBooleanBtnRow(iconName, iconSize, payloadWhenOff, payloadWhenOn, publishTopic, title, widgetId)

    return (
        <>
        
            {
            visible &&
            (<tr>
                <td>{widgetId}</td>
                <td>{!editView ? rowState.title : <input type="text" placeholder="Title" defaultValue={rowState.title} className="form-control" {...register("title")}/>}</td>
                <td className="text-left"> {!editView ? rowState.iconSize : <input type="text" placeholder="Title" defaultValue={rowState.iconSize} className="form-control" {...register("iconSize")}/>}</td>
                <td className="text-left"> {!editView ? rowState.iconName : <input type="text" placeholder="Title" defaultValue={rowState.iconName} className="form-control" {...register("iconName")}/>}</td>
                <td className="text-left"> {!editView ? rowState.publishTopic : <input type="text" placeholder="Title" defaultValue={rowState.publishTopic} className="form-control" {...register("publishTopic")}/>}</td>
                <td className="text-left"> {!editView ? rowState.payloadWhenOn : <input type="text" placeholder="Title" defaultValue={rowState.payloadWhenOn} className="form-control" {...register("payloadWhenOn")}/>}</td>
                <td className="text-left"> {!editView ? rowState.payloadWhenOff : <input type="text" placeholder="Title" defaultValue={rowState.payloadWhenOff} className="form-control" {...register("payloadWhenOff")}/>}</td>
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
