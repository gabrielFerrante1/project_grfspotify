import axios, { AxiosError } from "axios"
import ENV from '../config/services'

export const useApi = async <TypeDataResponse>(
    endpoint: string,
    method: 'get' | 'post' | 'put' | 'delete' = 'get',
    data?: object,
    authToken?: string
): Promise<{
    data: TypeDataResponse,
    errorMessage?: string,
    errorCode?: string
}> => {

    let params = method == 'get' ? data : {}
    let body = (['post', 'put', 'delete'].includes(method)) ? data : {}
    let headers = {}

    if (authToken) headers = { "Authorization": `Bearer ${authToken}` }

    try {
        const request = await axios<TypeDataResponse>({
            url: `${ENV.backend.base_url}/api/${endpoint}`,
            method,
            params,
            data: body,
            headers: headers
        })

        return {
            data: request.data
        }
    } catch (e) {
        const error = e as AxiosError<{ error: string }>

        return {
            data: '' as TypeDataResponse,
            errorMessage: error.response?.data.error || error.message,
            errorCode: error.code
        }
    }
}