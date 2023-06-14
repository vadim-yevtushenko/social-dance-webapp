export const useUpload = () => {

    const checkSize = (size, file) => {
        return file.size <= size
    }

    return {checkSize, }
}