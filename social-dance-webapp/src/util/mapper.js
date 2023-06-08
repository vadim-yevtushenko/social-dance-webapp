export const dancerMapper = (id, name, lastName, gender, birthday, description, level, dances, contactInfo, image) => {
    return{
        id,
        name,
        lastName,
        gender,
        birthday,
        description,
        level,
        dances,
        contactInfo,
        image
    }
}

export const schoolMapper = (id, name, description, dances, contactInfo, image, administrators) => {
    return{
        id,
        name,
        description,
        dances,
        contactInfo,
        image,
        administrators
    }
}

export const eventMapper = (id, name, description, dances, contactInfo, image, dateEvent, dateFinishEvent, organizers, schoolOrganizerId) => {
    return{
        id,
        name,
        description,
        dances,
        contactInfo,
        image,
        dateEvent,
        dateFinishEvent,
        organizers,
        schoolOrganizerId
    }
}