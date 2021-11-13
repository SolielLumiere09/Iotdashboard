import React from 'react'
import {Props} from 'components/app/Mqtt/BooleanBtnMqtt'

export const BooleanBtnRow = ({iconName, iconSize, payloadWhenOff, payloadWhenOn, publishTopic, title, widgetId} : Props) => {
    return (
        <tr>
            <td>{widgetId}</td>
            <td>{title}</td>
            <td className="text-center">{iconSize}</td>
            <td className="text-right">{iconName}</td>
            <td className="text-right">{publishTopic}</td>
            <td className="text-right">{payloadWhenOn}</td>
            <td className="text-right">{payloadWhenOff}</td>
        </tr>
    )
}
