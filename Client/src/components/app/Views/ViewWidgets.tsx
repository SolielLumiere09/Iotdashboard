import React from 'react'
import { Card, CardBody, CardTitle, Table} from 'reactstrap';
import { BooleanBtnRow } from './BooleanBtnRow';
import { useDashboard } from '../../../hooks/views/useDashboard';
import { Props as BooleanBtnProps } from 'components/app/Mqtt/BooleanBtnMqtt';
import { Props as DisplayMqttProps } from 'components/app/Mqtt/DisplayMqtt';
import { DisplayRow } from './DisplayRow';

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
                    <CardTitle className="text-center"> View Widgets </CardTitle>
                    <CardTitle> BooleanBtn Widgets </CardTitle>
                    
                    <Table className="overflow-hidden" responsive>
                        <thead>
                            <tr>
                                <th>WidgetId</th>
                                <th>Title</th>
                                <th className="text-left">IconSize</th>
                                <th className="text-left">IconName</th>
                                <th className="text-left">TopicToPublish</th>
                                <th className="text-left">PayloadOn</th>
                                <th className="text-left">PayloadOff</th>
                                <th className="text-left">Action</th>
                                
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
                                <th className="text-left">Unit</th>
                                <th className="text-left">Topic To Subscribe</th>
                                <th className="text-left">Property</th>
                                <th className="text-left">Action</th>
                            </tr>
                            {
                               getDisplayWidgets().map(value => {
                                   return (
                                       <DisplayRow
                                            key={value.widgetId}
                                            {...value.props as DisplayMqttProps}
                                       />
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
