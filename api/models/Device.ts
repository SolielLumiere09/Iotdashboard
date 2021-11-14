import moongose, { Schema } from 'mongoose'


interface Attributes {
    userId:     string
    deviceId:   string 
    deviceName: string 
    username:   string
    password:   string
    subscribe:  string
    publish:    string
}


const schema = new Schema<Attributes>({
    userId: {
        required: true,
        type: String
    },
    deviceId : {
        required: true,
        type: String
    },
    deviceName : {
        required: true,
        type: String
    },
    username : {
        required : true,
        type : String,
    },
    password : {
        required : true,
        type : String
    },
    subscribe : {
        required : true,
        type : String
    },
    publish : {
        required : true,
        type : String
    }
})

const Device = moongose.model('emqxauthrules', schema)

export {Device}
export type {Attributes}