import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngTuple } from 'leaflet';
import { Card, CardBody, CardText } from 'reactstrap';


interface Props {
    title : string
    position : LatLngTuple
    popupMesage : string
    height : number
}

export const MapDevice = ({height, position, popupMesage, title} : Props) => {

  
    return (
        <Card style={{height}}>
            <CardBody>
                <CardText className="h1 text-center">{title}</CardText>
                <MapContainer center={position} zoom={10} scrollWheelZoom={true} className='h-100'>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                        {popupMesage}
                        </Popup>
                    </Marker>

                </MapContainer>

            </CardBody>
        </Card>
    )
}
