import {useCallback} from "react";
import React from "react";
import {errorHandling} from "../api/notificationHandling";

export const useHttp = () => {

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {

            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            return await response.json();
        } catch(error) {
            console.log("error", error)
            errorHandling(error)
        }
    }, []);

    // const clearError = useCallback(() => {
    // }, []);

    return {request,
        // clearError,
        // process,
        // setProcess
    }
}