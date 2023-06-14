export const getFullAddress = (contactInfo) => {
    let fullAddress = "";
    if (!!contactInfo.country) fullAddress = fullAddress.concat(contactInfo.country).concat(" ");
    if (!!contactInfo.city) fullAddress = fullAddress.concat(contactInfo.city).concat(" ");
    if (!!contactInfo.street) fullAddress = fullAddress.concat(contactInfo.street).concat(" ");
    if (!!contactInfo.building) fullAddress = fullAddress.concat(contactInfo.building).concat(" ");

    return fullAddress;
}