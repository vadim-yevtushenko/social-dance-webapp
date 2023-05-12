import {GET} from "./Endpoints";
import axios from 'axios'

class DancerApi  {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json();
        // return await axios.get(url);
    }

    getAllDancers = () => {
        console.log("url", GET.getAllDancers());
        return this.getResource(GET.getAllDancers())
    }

    getDancer = (id) => {
        const url = `http://localhost:8080/dancers/`;
        return this.getResource(GET.getDancer(id));
    }
}

export default DancerApi;