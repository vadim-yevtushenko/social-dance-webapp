import axios from "axios";

export async function requestWrapper ({ axiosConfig }) {

    try {
        return await axios.request(axiosConfig);
    }
    catch (e){
        console.log(e)
        throw e
        // throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }

}

export default requestWrapper