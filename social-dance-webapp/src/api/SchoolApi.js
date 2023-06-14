import requestWrapper from "./requestWrapper";
import {GET, POST} from "./Endpoints";

export const getSchools = (page, size) => {
    return requestWrapper({
        axiosConfig: {
            method: 'GET',
            url: GET.getSchools(page, size)
        }
    })
};

export const getSchool = (id) => {
    return requestWrapper(GET.getSchool(id));
}

export const uploadSchoolImage = (id, formData) => {
    return requestWrapper({
        axiosConfig: {
            method: 'post',
            url: POST.uploadSchoolImage(id),
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data' }
        }
    })
}