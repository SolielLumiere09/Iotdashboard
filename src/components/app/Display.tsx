import React from 'react'
import { BackgroundColorContext, mappingColors } from "contexts/BackgroundColorContext";
import { Card, CardBody, CardText } from 'reactstrap';
import moment from 'moment';
import { useState } from 'react';

interface Props {
    title : string
    measure : number
    unit : string
}

export const Display = ({title, measure, unit} : Props) => {

    const [lastMessage] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
    
    return (
        <BackgroundColorContext.Consumer>
             {({color}) => (
                 <Card> 
                    <CardBody>
                        <CardText className="text-center h1 m-1">{title}</CardText>
                        <CardText className="text-center" style={{fontSize : 40, color : mappingColors[color]}}>{measure} {unit}</CardText>
                        <CardText className="text-center h4">{lastMessage}</CardText>
                        
                    </CardBody>
                 </Card>
             )}

        </BackgroundColorContext.Consumer>

    )
}