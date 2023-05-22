export const getFullAddress = (contactInfo) => {
    let fullAddress = "";
    if (!!contactInfo.city) fullAddress = fullAddress.concat(contactInfo.city);
    if (!!contactInfo.street) fullAddress = fullAddress.concat(contactInfo.street);
    if (!!contactInfo.building) fullAddress = fullAddress.concat(contactInfo.building);

    return fullAddress;
}