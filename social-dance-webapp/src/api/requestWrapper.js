import axios from "axios";
import React from "react";

export async function requestWrapper ({ axiosConfig }) {
    console.log("axiosConfig", axiosConfig)
    try {
        return await axios.request(axiosConfig);
    }
    catch (error){
        console.error(error)
        throw error
    }

}

export default requestWrapper