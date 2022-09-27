export const toFixed = (num, fixed) => {
    const number = Math.trunc(num*Math.pow(10, fixed))/Math.pow(10, fixed)
    return number
}