import { useMemo, useRef, useCallback, createContext } from 'react';
import Notify from 'react-notification-alert';

interface NotificationContextProps {
    openNotification : (message : string) => void
}

const NotificationContextProvider = createContext<NotificationContextProps>({} as NotificationContextProps)


export const NotificationContext = ({children}) => {
    const ref = useRef(null)
    const options = useMemo(() => {
        return {
            place : 'tc',
            message : '',
            type : 'danger',
            icon : 'tim-icons icon-bell-55',
            autoDismiss : 5,
            closeButton : true
        }
    }, [])


    const openNotification = useCallback((message : string) => {
        if(ref.current !== null)
            ref.current.notificationAlert({
                ...options,
                message
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