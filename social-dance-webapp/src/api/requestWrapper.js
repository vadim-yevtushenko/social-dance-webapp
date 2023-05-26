import axios from "axios";

const requestWrapper = async (url, method, body) => {

    console.log("url", url);
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }

    return await res.json();
    // return await axios.get(url).then(res => res.data);
};

export default requestWrapper