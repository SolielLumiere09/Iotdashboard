import React from 'react'
import { Props as DisplayMqttProps } from 'components/app/Mqtt/DisplayMqtt';
import { Button } from 'reactstrap';

export const DisplayRow = ({widgetId, title, unit, topicToSubscribe, property} : DisplayMqttProps) => {
    return (
        <tr>
        <td>{widgetId}</td>
        <td>{title}</td>
        <td className="text-left">{unit}</td>
        <td className="text-left">{topicToSubscribe}</td>
        <td className="text-left">{property}</td>
        <td className="text-left">
            <Button className="btn-icon" color="info" size="sm">
                <i className="fa fa-check"></i>
            </Button>{` `}
            <Button className="btn-icon" color="success" size="sm">
                <i className="fa fa-edit"></i>
            </Button>{` `}
            <Button className="btn-icon" color="danger" size="sm">
                <i className="fa fa-times" />
            </Button>
        </td>

    </tr>
    )
}
