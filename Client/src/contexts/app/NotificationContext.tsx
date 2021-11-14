import { useMemo, useRef, useCallback, createContext } from 'react';
import Notify from 'react-notification-alert';

interface NotificationContextProps {
    openNotification : (message : string, color? : string) => void
}

const NotificationContextProvider = createContext<NotificationContextProps>({} as NotificationContextProps)


export const NotificationContext = ({children}) => {
    const ref = useRef(null)
   

    const options = useMemo(() => {
        return {
            place : 'tc',
            message : '',
            type : 'warning',
            icon : 'tim-icons icon-bell-55',
            autoDismiss : 5,
            closeButton : true
        }
    }, [])


    const openNotification = useCallback((message : string, color? : string ) => {
        if(ref.current !== null)
            ref.current.notificationAlert({
                ...options,
                message,
                type : color !== undefined ? color : 'danger'
            })
     }, [options, ref])


    return (
       
        <NotificationContextProvider.Provider value={{
            openNotification
        }}>
            {children}
            <Notify ref={ref}/>
        </NotificationContextProvider.Provider>
     
    )
}

export {NotificationContextProvider}