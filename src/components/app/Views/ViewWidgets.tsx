import React from 'react'
import { Card, CardBody, CardTitle, Table} from 'reactstrap';
import { BooleanBtnRow } from './BooleanBtnRow';
import { useDashboard } from '../../../hooks/views/useDashboard';
import { Props as BooleanBtnProps } from 'components/app/Mqtt/BooleanBtnMqtt';
import { Props as DisplayMqttProps } from 'components/app/Mqtt/DisplayMqtt';

export const ViewWidgets = () => {
    const {widgets} = useDashboard()


    const getBooleanBtn = () => {

        return widgets.filter(value => {
            return value.type === 'BooleanBtnMqtt'
        })

    }

    const getDisplayWidgets = () => {
        return widgets.filter(value => {
            return value.type === 'DisplayMqtt'
        })
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle> View Widgets </CardTitle>
                    <CardTitle> BooleanBtn Widgets </CardTitle>
                    
                    <Table className="overflow-hidden" responsive>
                        <thead>
                            <tr>
                                <th>WidgetId</th>
                                <th>Title</th>
                                <th className="text-center">IconSize</th>
                                <th className="text-right">IconName</th>
                                <th className="text-right">TopicToPublish</th>
                                <th className="text-right">PayloadOn</th>
                                <th className="text-right">PayloadOff</th>
                                <th className="text-right">Acction</th>
                                
                            </tr>
                            {
                                getBooleanBtn().map(value => {
                                    return(
                                        <BooleanBtnRow
                                            key={value.widgetId}
                                            widgetId = {value.widgetId}
                                            {...value.props as BooleanBtnProps}
                                        
                                        />
                                         
                                    )
                                })
                            }
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </Table>
                    

                    <CardTitle> Display Widgets </CardTitle>
                    <Table className="overflow-hidden" responsive>
                        <thead>
                            <tr>
                                <th>WidgetId</th>
                                <th>Title</th>
                                <th className="text-center">Unit</th>
                                <th className="text-right">Topic To Subscribe</th>
                                <th className="text-right">Property</th>
                                <th className="text-right">Action</th>
                            </tr>
                            {
                               getDisplayWidgets().map(value => {
                                   return (
                                    <tr>
                                        <td>{value.widgetId}</td>
                                        <td>{value.props.title}</td>
                                        <td className="text-center">{(value.props as DisplayMqttProps).unit}</td>
                                        <td className="text-right">{(value.props as DisplayMqttProps).topicToSubscribe}</td>
                                        <td className="text-right">{(value.props as DisplayMqttProps).property}</td>

                                    </tr>
                                   )
                               })
                            }
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </Table>

                </CardBody>
                
            </Card>

        </div>
    )
}
