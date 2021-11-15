import React from 'react'
import { Props as DisplayMqttProps } from 'components/app/Mqtt/DisplayMqtt';
import { Button} from 'reactstrap';
import { useEditableRow } from '../../../hooks/views/useEditableRow';

export const DisplayRow = ({widgetId, title, unit, topicToSubscribe, property} : DisplayMqttProps) => {


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
            unit, 
            topicToSubscribe, 
            property
        })  

    
    return (
        <>


        
            {
            visible &&
            (<tr>
                <td>{!editView ? (rowState as DisplayMqttProps).widgetId : <input type="text" placeholder="widgetId" defaultValue={(rowState as DisplayMqttProps).widgetId} readOnly className="form-control" {...register("widgetId")}/>}</td>
                <td>{!editView ? (rowState as DisplayMqttProps).title : <input type="text" placeholder="Title" defaultValue={(rowState as DisplayMqttProps).title} className="form-control" {...register("title")}/>}</td>
                <td>{!editView ? (rowState as DisplayMqttProps).unit : <input type="text" placeholder="Unit" defaultValue={(rowState as DisplayMqttProps).unit} className="form-control" {...register("unit")}/>}</td>
                <td>{!editView ? (rowState as DisplayMqttProps).topicToSubscribe : <input type="text" placeholder="topicToSubscribe" defaultValue={(rowState as DisplayMqttProps).topicToSubscribe} className="form-control" {...register("topicToSubscribe")}/>}</td>
                <td>{!editView ? (rowState as DisplayMqttProps).property : <input type="text" placeholder="property" defaultValue={(rowState as DisplayMqttProps).property} className="form-control" {...register("property")}/>}</td>
                
                
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
