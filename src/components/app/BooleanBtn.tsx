import { useState } from 'react'
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import * as Icons from 'react-icons/all'
import { IconContext } from "react-icons";
import { BackgroundColorContext, mappingColors, classMappingColors } from "contexts/core/BackgroundColorContext";
import React from 'react';


interface Props {
    widgetId : string
    title : string 
    iconSize : string 
    iconName : string
    onClick : (status : boolean) => void
}

export const BooleanBtn = ({widgetId, title, iconSize, iconName, onClick} : Props) => {
    const [colorSwitch, setColorSwitch] = useState(window.localStorage.getItem(widgetId) === "true")
    

    const handleClick = () => {
        setColorSwitch(!colorSwitch)
        onClick(!colorSwitch)

        window.localStorage.setItem(widgetId, ""+!colorSwitch);
    }

    const renderIcon = () => {
        let icon = <></>

        try{
            if(Icons[iconName]){
                icon = React.createElement(Icons[iconName])
            }

        }catch(e){

        }

        return icon
    }

    return (
        <BackgroundColorContext.Consumer>
            {({color}) => (
                <Card style={{height : '210px'}}>
                    <CardBody className="mt-4">
                        <CardTitle className="text-center h1">{title}</CardTitle>
                        <div className="d-flex justify-content-between">
                            <IconContext.Provider value={{
                                size : iconSize,
                                color : colorSwitch ? mappingColors[color] : ''
                            }}>
                            {renderIcon()}

                            </IconContext.Provider>
                            <Button color={classMappingColors[color]}  onClick={handleClick}>On/Off</Button>
                        </div>
                    </CardBody>
                </Card>
            )}
        </BackgroundColorContext.Consumer>
    )
}

export type {Props}