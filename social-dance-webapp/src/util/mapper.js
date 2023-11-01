export const dancerMapper = (id, name, lastName, gender, socialNetworks, birthday, description, level, dances, contactInfo, image) => {
    return{
        id,
        name,
        lastName,
        gender,
        birthday,
        socialNetworks,
        description,
        level,
        dances,
        contactInfo,
        image
    }
}

export const schoolMapper = (id, name, description, dances, contactInfo, socialNetworks, image, administrators) => {
    return{
        id,
        name,
        description,
        dances,
        contactInfo,
        socialNetworks,
        image,
        administrators
    }
}

export const eventMapper = (id, name, description, dances, contactInfo, socialNetworks, image, dateEvent, dateFinishEvent, organizers, schoolOrganizer) => {
    return{
        id,
        name,
        description,
        dances,
        contactInfo,
        socialNetworks,
        image,
        dateEvent,
        dateFinishEvent,
        organizers,
        schoolOrganizer
    }
}

export const reviewMapper = (id, schoolId, dancerId, review, incognito) => {
    return {
        id,
        schoolId,
        dancerId,
        review,
        incognito
    }
}

export const ratingMapper = (id, schoolId, dancerId, rating) => {
    return {
        id,
        schoolId,
        dancerId,
        rating
    }
}