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

export const reviewMapper = (id, objectId, dancerId, review, incognito) => {
    return {
        id,
        objectId,
        dancerId,
        review,
        incognito
    }
}

export const ratingMapper = (id, objectId, dancerId, rating) => {
    return {
        id,
        objectId,
        dancerId,
        rating
    }
}