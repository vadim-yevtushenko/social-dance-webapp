import toast from "react-hot-toast";
import NotificationComponent from "../components/modals/NotificationComponent";
import React from "react";

export const successHandling = (message) => {
    toast.custom(<NotificationComponent
        showNotification={true}
        isError={false}
        message={message}
    />)
    // toast.success(message, {
    //     position: "top-right",
    //     duration: 4000,
    //     className: 'my-3 mx-3'
    // })
}

export const errorHandling = (error) => {
    if (error.response){
        toast.custom(<NotificationComponent
            showNotification={true}
            isError={true}
            message={error.response.data.message}
        />)
        // toast.error(error.response.data.message, {
        //     position: "top-right",
        //     duration: 4000,
        //     className: 'my-3 mx-3'
        // })
    }
}

export const loginErrorHandling = () => {

}

export const registrationErrorHandling = () => {

}