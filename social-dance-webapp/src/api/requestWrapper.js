import axios from "axios";
import { dancerLogout } from "../redux/actions/authActions";

export async function requestWrapper ({ dispatch, getState, axiosConfig }) {

    if (getState) {
        const {
            auth: { token },
        } = getState();
        if (token !== '') {
            axiosConfig.headers = {
                ...axiosConfig.headers,
                Authorization: `Bearer_${ token }`
            }
        }
    }

    try {
        return await axios.request(axiosConfig);
    }
    catch (error){
        console.error("error", error)
        if (error.response.status === 500 && !!error.config.headers.Authorization) {
            dispatch(dancerLogout())
            error = {...error, message: "Wrong token, LOG IN please!"}
        }
        throw error
    }

}

export default requestWrapper