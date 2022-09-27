const getToken = () => {
    try {
        const token = localStorage.getItem('access_token')
        return token
    } catch (error) {
        return
    }
}
export default getToken