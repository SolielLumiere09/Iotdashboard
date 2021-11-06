import { createContext } from "react";


interface AuthState {
    token? : string
    name? : string
    id? : string
    isAuth? : boolean
}

const authSate : AuthState= {
    isAuth : false
}




const AuthContext = createContext<AuthState>(authSate)



export {AuthContext}