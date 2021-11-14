import { Widget as WidgetComponent } from 'components/app/Widget';
import { Row } from 'reactstrap';
import { useDashboard } from '../../hooks/views/useDashboard';


export const Dashboard = () => {
    const {widgets} = useDashboard()
    

    return (
        <>
            <div className="content">
                <Row>

                    {
                        widgets.map(widget => {
                            return (
                                <WidgetComponent
                                    key={widget.widgetId}
                                    props={widget.props}
                                    type={widget.type}
                                />
                            )
                        })
                    }

                </Row>

            </div>      
        </>
    )
}
