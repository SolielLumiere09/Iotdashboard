import { useContext, useEffect } from 'react';
import { AuthContext, AuthContextState } from 'contexts/app/AuthContext';
import { useHistory } from 'react-router-dom';
import { APP_LOGIN_STATUS } from 'contexts/app/Generalvariables';

export const MiddlewareValidator = ({children} : any) => {

    const authContext = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {

        try {
            const state = JSON.parse(window.localStorage.getItem(APP_LOGIN_STATUS)) as AuthContextState

            if(state.isLoged === false){
            
                console.log("app state ---> ", authContext.authContextState);
                window.localStorage.setItem(APP_LOGIN_STATUS, JSON.stringify(authContext.authContextState));
    
                history.push('/Login')    
            }else {
                history.push('/admin/dashboard')
            }

        } catch (error) {
            console.log('catching exceptions :)');
            history.push('/Login')    
            
        }
    
    }, [authContext, history])
    
    return (
        <>
            {children}
        </>
    )
}
