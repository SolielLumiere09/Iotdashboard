import React from 'react'
import { useMemo, useCallback} from 'react';


export const useNotification = (ref : React.MutableRefObject<any>) => {
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


    return {
        openNotification
    }
}
