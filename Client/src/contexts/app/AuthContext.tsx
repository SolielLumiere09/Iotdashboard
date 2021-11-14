import { createContext, useState } from 'react';


interface AuthContextState {
    isLoged : boolean
    token? : string
    userId? : string
}


interface AuthContextProps {
    authContextState : AuthContextState,
    setState : (state : AuthContextState) => void
}


const AuthContextInitialState : AuthContextState = {
    isLoged : false,
    userId : undefined,
    token : undefined 
}



const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)



export const AuthContextProvider = ({children}) => {

    const [AuthProps, setAuthProps] = useState<AuthContextState>(AuthContextInitialState)

    const setState = (state : AuthContextState) => {
        setAuthProps(state)
    }

    return (
        <AuthContext.Provider value={{
            authContextState : AuthProps,
            setState
        }}>
            {children}
        </AuthContext.Provider>
      
    )
}


export {AuthContext}
export type {AuthContextState}