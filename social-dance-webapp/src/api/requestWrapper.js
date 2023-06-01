import axios from "axios";

const requestWrapper = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

    console.log("url", url);
    let res = await fetch(url, {method, body, headers});

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }

    return await res.json();
    // return await axios.get(url).then(res => res.data);
};

export default requestWrapper