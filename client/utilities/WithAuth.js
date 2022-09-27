import { useRouter } from 'next/router'
export const WithAuth = (WrappedComponent) => {
    return (props) => {
        if (typeof window !== 'undefined') {
            const Router = useRouter()
            const isAuthenticated =
                localStorage.getItem('access_token') != null ? true : false
            if (!isAuthenticated) {
                Router.replace('/account/login')
                return null
            }
            return <WrappedComponent {...props} />
        }
        return <WrappedComponent {...props} />
    }
}