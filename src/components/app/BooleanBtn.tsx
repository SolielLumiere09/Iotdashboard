import { useState } from 'react'
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import * as Icons from 'react-icons/all'
import { IconContext } from "react-icons";
import { BackgroundColorContext, mappingColors, classMappingColors } from "contexts/BackgroundColorContext";
import React from 'react';


interface Props {
    title : string 
    iconSize : string 
    iconName : string

}

export const BooleanBtn = ({title, iconSize, iconName} : Props) => {
    const [colorSwitch, setColorSwitch] = useState(false)


    const Icon = React.createElement(Icons[iconName])

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
                            <Button color={classMappingColors[color]} onClick={() => setColorSwitch(!colorSwitch)}>On/Off</Button>
                        </div>
                    </CardBody>
                </Card>
            )}
        </BackgroundColorContext.Consumer>
    )
}
