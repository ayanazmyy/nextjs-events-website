import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
    notification: null,
    showNotification: function (notificationData) { },
    hideNotification: function () { }
});

export function NotificationCtxProvider(props) {
    const [activeNotification, setActiveNotification] = useState();

    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    useEffect(() => {
        if (activeNotification
            && (activeNotification.status == "success"
            || activeNotification.status == "error")) {

            const timer = setTimeout(() => {
                hideNotificationHandler();
            }, 2000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [activeNotification])

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;