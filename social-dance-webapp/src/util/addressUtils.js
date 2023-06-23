export const getFullAddress = (contactInfo) => {
    let fullAddress = "";
    if (!!contactInfo?.country) fullAddress = fullAddress.concat(contactInfo.country);
    if (!!contactInfo?.city) fullAddress = fullAddress.concat(", ").concat(contactInfo.city);
    if (!!contactInfo?.street) fullAddress = fullAddress.concat(", ").concat(contactInfo.street);
    if (!!contactInfo?.building) fullAddress = fullAddress.concat(", ").concat(contactInfo.building);

    return fullAddress;
}