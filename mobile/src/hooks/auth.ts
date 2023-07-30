import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"
import { ApiSignIn, ApiUserInit, User } from "../@types/Auth"
import { setClearUser, setUser } from "../redux/reducers/authReducer"
import { RootState } from "../redux/store"
import { useApi } from "./api"

export const useAuth = () => {
    const authReducer = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    const { getItem: getAuthJwt, setItem: setAuthJwt, removeItem: removeAuthJwt } = useAsyncStorage('auth-jwt');

    const userInit = async () => {
        if (authReducer.user.token != "") return;

        const authJwt = await getAuthJwt()

        if (authJwt) {
            const request = await useApi<ApiUserInit>('token-query', 'get', {}, authJwt)
            if (request.data.id) {
                dispatch(setUser({
                    id: request.data.id,
                    name: request.data.name,
                    email: request.data.email,
                    token: authJwt
                }))
            }
        }
    }

    const signIn = async (email: string, password: string): Promise<boolean> => {
        const request = await useApi<ApiSignIn>('login', 'post', { email, password })

        const user = request.data.user
        const jwt = request.data.jwt

        if (!request.data.error) {
            dispatch(setUser({
                id: user.id,
                name: user.name,
                email: user.email,
                token: jwt
            }))

            await setAuthJwt(jwt)

            return true
        }

        return false
    }

    const signOut = async () => {
        await removeAuthJwt()
        dispatch(setClearUser())
    }

    const getUser = (): User => { return authReducer.user }

    return {
        isLogged: authReducer.user.token != '' ? true : false,
        userInit,
        signIn,
        signOut,
        getUser
    }
}


