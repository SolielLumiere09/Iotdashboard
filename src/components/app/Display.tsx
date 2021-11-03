import React from 'react'
import { BackgroundColorContext, mappingColors } from "contexts/core/BackgroundColorContext";
import { Card, CardBody, CardText } from 'reactstrap';


interface Props {
    title : string
    measure : number
    unit : string
    date : string
}

export const Display = ({title, measure, unit, date} : Props) => {


    
    return (
        <BackgroundColorContext.Consumer>
             {({color}) => (
                 <Card> 
                    <CardBody>
                        <CardText className="text-center h1 m-1">{title}</CardText>
                        <CardText className="text-center" style={{fontSize : 40, color : mappingColors[color]}}>{measure} {unit}</CardText>
                        <CardText className="text-center h4">{date}</CardText>
                    </CardBody>
                 </Card>
             )}

        </BackgroundColorContext.Consumer>

    )
}
