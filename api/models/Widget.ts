import moongose, { Schema, SchemaDefinitionType } from 'mongoose'

interface BooleanBtnMqtt {
    widgetId : string
    title : string 
    iconSize : string 
    iconName : string
    publishTopic : string
    payloadWhenOff : string
    payloadWhenOn : string
}

interface DisplayChartMqtt {
    widgetId : string
    title : string,
    unit : string, 
    labels : Array<String>
    data : Array<number>
    topicToSubscribe : string 
    property : string
}

interface DisplayMqtt {
    widgetId : string
    title : string
    unit : string
    topicToSubscribe : string 
    property : string
}

interface MapDeviceMqtt {
    widgetId : string
    title : string 
    height : number
    popupMesage : string
    topicToSubscribe : string 
    property : string 

}

type TypeComponent = 
    | 'BooleanBtnMqtt'
    | 'DisplayMqtt'
    | 'DisplayChartMqtt'
    | 'MapDeviceMqtt' 

type props = BooleanBtnMqtt | DisplayChartMqtt | DisplayMqtt | MapDeviceMqtt

interface Attributes {
    userId : string
    widgetId : string
    type : TypeComponent
    props : props 
}

const schema = new Schema<Attributes>({
    userId : {
        required : true,
        type : String
    },
    widgetId : {
        required : true,
        type : String
    },
    type : {
        required : true,
        type : String
    },
    props : {
        required : true,
        type : Schema.Types.Mixed
    }

})

const Widget = moongose.model('widgets', schema)

export {Widget}
export type {Attributes, props}