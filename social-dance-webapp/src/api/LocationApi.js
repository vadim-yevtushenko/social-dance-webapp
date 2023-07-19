import {loadingRequest} from "../redux/actions/requestActions";
import requestWrapper from "./requestWrapper";
import {GET} from "./Endpoints";
import {getEvents} from "../redux/actions/ListsActions";
import {errorHandling} from "./notificationHandling";

export const fetchCountries = (country) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getCountries(country)
        }
    })
};

export const fetchCities = (city, country) => (dispatch) => {
    dispatch(loadingRequest(true))
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getCities(city, country)
        }
    })
};