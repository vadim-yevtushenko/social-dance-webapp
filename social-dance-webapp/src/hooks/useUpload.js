import Compress from "compress.js";

export const useUpload = () => {

    const checkSize = (size, file) => {
        return file.size <= size
    }

    const resizeImage = async (file, maxSize, maxWidth = 300, maxHeight = 300) => {

        const compress = new Compress()
        if (!checkSize(maxSize, file)){
            console.log("!checkSize ", file)
            const resizedImage = await compress.compress([file], {
                size: 1,
                quality: 1,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                resize: true
            })
            const img = resizedImage[0];
            const base64str = img.data
            const imgExt = img.ext
            return Compress.convertBase64ToFile(base64str, imgExt);
        }
        return file
    }

    return { checkSize, resizeImage }
}