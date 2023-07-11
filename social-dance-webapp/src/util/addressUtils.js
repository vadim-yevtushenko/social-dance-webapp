export const getFullAddress = (contactInfo) => {
    let fullAddress = "";
    if (!!contactInfo?.country) fullAddress = fullAddress.concat(contactInfo.country);
    if (!!contactInfo?.city) fullAddress = fullAddress.concat(", ").concat(contactInfo.city);
    if (!!contactInfo?.address) fullAddress = fullAddress.concat(", ").concat(contactInfo.address);

    return fullAddress;
}