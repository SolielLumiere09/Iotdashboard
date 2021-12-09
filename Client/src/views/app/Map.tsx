import { MapDevice } from 'components/app/MapDevice'
import React from 'react'

export const Map = () => {
    return (
        <div className="content">
            <MapDevice
                height = {800}
                popupMesage = "device"
                position = {[32.5011879,-117.0699008]}
                title = "Map"
            />
        </div>
    )
}
