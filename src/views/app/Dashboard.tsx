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
                                    props={widget.props}
                                    size={widget.size}
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
