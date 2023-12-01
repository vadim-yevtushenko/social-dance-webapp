import toast from "react-hot-toast";
import NotificationComponent from "../components/modals/NotificationComponent";
import React from "react";

export const successHandling = (message) => {
    toast.custom(<NotificationComponent
        showNotification={true}
        isError={false}
        message={message}
    />, {
        position: "top-right",
        duration: 2000,
        className: 'my-3 mx-3'
    })
    // toast.success(message, {
    //     position: "top-right",
    //     duration: 4000,
    //     className: 'my-3 mx-3'
    // })
}

export const errorHandling = (error) => {
    if (error){
        const message = error.response?.data?.message ? error.response.data.message : error.message
        toast.custom(<NotificationComponent
            showNotification={true}
            isError={true}
            message={message}
        />, {
                    position: "top-right",
                    duration: 3000,
                    className: 'my-3 mx-3'
                })
    }
    // if (error){
    //     toast.error(error, {
    //         position: "top-right",
    //         duration: 3000,
    //         className: 'my-3 mx-3'
    //     })
    // }
}