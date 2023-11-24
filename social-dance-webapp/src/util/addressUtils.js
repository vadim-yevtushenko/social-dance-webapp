export const getFullAddress = (contactInfo) => {
    let fullAddress = "";
    if (!!contactInfo?.country) fullAddress = fullAddress.concat(contactInfo.country).concat(", ");
    if (!!contactInfo?.city) fullAddress = fullAddress.concat(contactInfo.city).concat(", ");
    if (!!contactInfo?.address) fullAddress = fullAddress.concat(contactInfo.address);

    return fullAddress;
}