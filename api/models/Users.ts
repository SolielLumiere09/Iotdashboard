import moongose, { Schema } from 'mongoose'


interface Attributes {
    userName : string 
    password : string 
}

const schema = new Schema<Attributes>({
    userName : String,
    password : String
})

const User = moongose.model('Users', schema)

export {User}
export type {Attributes}