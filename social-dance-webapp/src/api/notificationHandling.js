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
        duration: 1000,
        className: 'my-3 mx-3'
    })
    // toast.success(message, {
    //     position: "top-right",
    //     duration: 4000,
    //     className: 'my-3 mx-3'
    // })
}

export const errorHandling = (error) => {
    console.log("error1", error)
    if (error.response){
        toast.custom(<NotificationComponent
            showNotification={true}
            isError={true}
            message={error.response.data.message}
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

export const loginErrorHandling = () => {

}

export const registrationErrorHandling = () => {

}