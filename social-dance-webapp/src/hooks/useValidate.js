export const useValidate = () => {
    const validatePassword = (value) => {
        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /\d/g;

        if (!value.match(lowerCase)){
            return "Lowercase required."
        }else if (!value.match(upperCase)){
            return "Uppercase required."
        }else if (!value.match(numbers)){
            return "Number required."
        }else {
            return null
        }
    }

    return { validatePassword }
}