import React from 'react'
import { Card, CardBody, CardTitle, Table} from 'reactstrap';
import { BooleanBtnRow } from './BooleanBtnRow';
import { useDashboard } from '../../../hooks/views/useDashboard';
import { Props as BooleanBtnProps } from 'components/app/Mqtt/BooleanBtnMqtt';
import { Props as DisplayMqttProps } from 'components/app/Mqtt/DisplayMqtt';
import { Props as DisplayChartMqttProps } from 'components/app/Mqtt/DisplayChartMqtt';
import { DisplayRow } from './DisplayRow';
import { DisplayChartRow } from './DisplayChartRow';

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

    const getDisplayChartWidgets = () => {
        return widgets.filter(value => {
            return value.type === 'DisplayChartMqtt'
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
                    </Table>

                    <CardTitle> Display Chart Widgets </CardTitle>
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
                               getDisplayChartWidgets().map(value => {
                                   return (
                                       <DisplayChartRow
                                            key={value.widgetId}
                                            {...value.props as DisplayChartMqttProps}
                                       />
                                   )
                               })
                            }
                        </thead>
                    </Table>

                </CardBody>
                
            </Card>

        </div>
    )
}
