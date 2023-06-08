export const GET_ADMINISTRATED_SCHOOL = "GET_ADMINISTRATED_SCHOOL";

export const getAdministratedSchool = school => ({
    type: GET_ADMINISTRATED_SCHOOL,
    payload: school
})