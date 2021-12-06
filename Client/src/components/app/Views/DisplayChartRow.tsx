import React from 'react'
import { Props as DisplayChartMqttProps } from 'components/app/Mqtt/DisplayChartMqtt';
import { useEditableRow } from '../../../hooks/views/useEditableRow';
import { Button } from 'reactstrap';

export const DisplayChartRow = ({widgetId, data, labels, property, title, topicToSubscribe, unit} : DisplayChartMqttProps) => {
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
            data, 
            labels,
            topicToSubscribe, 
            property
        })  
    
    
    return (
        <>


        
        {
            visible &&
            (<tr>
                <td>{!editView ? (rowState as DisplayChartMqttProps).widgetId : <input type="text" placeholder="widgetId" defaultValue={(rowState as DisplayChartMqttProps).widgetId} readOnly className="form-control" {...register("widgetId")}/>}</td>
                <td>{!editView ? (rowState as DisplayChartMqttProps).title : <input type="text" placeholder="Title" defaultValue={(rowState as DisplayChartMqttProps).title} className="form-control" {...register("title")}/>}</td>
                <td>{!editView ? (rowState as DisplayChartMqttProps).unit : <input type="text" placeholder="Unit" defaultValue={(rowState as DisplayChartMqttProps).unit} className="form-control" {...register("unit")}/>}</td>
                <td>{!editView ? (rowState as DisplayChartMqttProps).topicToSubscribe : <input type="text" placeholder="topicToSubscribe" defaultValue={(rowState as DisplayChartMqttProps).topicToSubscribe} className="form-control" {...register("topicToSubscribe")}/>}</td>
                <td>{!editView ? (rowState as DisplayChartMqttProps).property : <input type="text" placeholder="property" defaultValue={(rowState as DisplayChartMqttProps).property} className="form-control" {...register("property")}/>}</td>
                
                
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
            </tr>)
        
        }

    </>
    )
}
