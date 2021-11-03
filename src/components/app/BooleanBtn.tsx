import { useState } from 'react'
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import * as Icons from 'react-icons/all'
import { IconContext } from "react-icons";
import { BackgroundColorContext, mappingColors, classMappingColors } from "contexts/core/BackgroundColorContext";
import React from 'react';


interface Props {
    deviceId : string
    title : string 
    iconSize : string 
    iconName : string
    onClick : (status : boolean) => void
}

export const BooleanBtn = ({deviceId, title, iconSize, iconName, onClick} : Props) => {
    const [colorSwitch, setColorSwitch] = useState(window.localStorage.getItem(deviceId) === "true")
    const Icon = React.createElement(Icons[iconName])

    const handleClick = () => {
        setColorSwitch(!colorSwitch)
        onClick(!colorSwitch)

        window.localStorage.setItem(deviceId, ""+!colorSwitch);
    }

    return (
        <BackgroundColorContext.Consumer>
            {({color}) => (
                <Card>
                    <CardBody>
                        <CardTitle className="text-center h1">{title}</CardTitle>
                        <div className="d-flex justify-content-between">
                            <IconContext.Provider value={{
                                size : iconSize,
                                color : colorSwitch ? mappingColors[color] : ''
                            }}>
                            {Icon}

                            </IconContext.Provider>
                            <Button color={classMappingColors[color]}  onClick={handleClick}>On/Off</Button>
                        </div>
                    </CardBody>
                </Card>
            )}
        </BackgroundColorContext.Consumer>
    )
}
