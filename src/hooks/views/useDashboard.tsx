import { useState, useEffect, useContext } from 'react';
import { axiosInstance } from 'contexts/app/Generalvariables';
import { AuthContext } from 'contexts/app/AuthContext';
import { Props as BooleanBtnProps } from '../../components/app/Mqtt/BooleanBtnMqtt';
import { Props as DisplayMqttProps } from '../../components/app/Mqtt/DisplayMqtt';
import { Props as DsiplayChartProps } from '../../components/app/Mqtt/DisplayChartMqtt';
import { Props as MapDeviceProps } from 'components/app/Mqtt/MapDeviceMqtt';


export interface WidgetResponse {
    accepted: boolean;
    msg:      string;
    widgets:  Widget[];
}

export interface Widget {
    userId:   string;
    widgetId: string;
    type:     TypeComponent;
    size:     Size;
    props:    ComponentProps;
}

type ComponentProps = BooleanBtnProps | DisplayMqttProps | DsiplayChartProps | MapDeviceProps
type TypeComponent = 
    | 'BooleanBtnMqtt'
    | 'DisplayMqtt'
    | 'DisplayChartMqtt'
    | 'MapDeviceMqtt' 

export interface Size {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export const useDashboard = () => {
    const [widgets, setWidgets] = useState<Widget[]>([])
    const {authContextState} = useContext(AuthContext)

    useEffect(() => {
        
        const fillWidgets = async() => {
            try{
              
                
                const {data} = await axiosInstance.get<WidgetResponse>('/api/getWidgets', {
                    params : {
                        userId : authContextState.userId
                    }
                })

                if(data.accepted){
                    setWidgets(data.widgets)
                    console.log(data.widgets);
                    
                }
                else {
                    console.log(data.widgets);
                }

            }catch(e){
                console.log("server error");
            }
        }



        fillWidgets()
        return () => {
            
        }
    }, [authContextState])


    return {
        widgets
    }
}
