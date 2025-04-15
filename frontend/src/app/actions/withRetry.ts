import axios from "axios";
import { redirect } from "next/navigation";
import { getCookies, getHeaderCookies } from "./getSSCookies";

export async function withRetry(url: string, options: any = {}) {
    try {
        const response = await axios({
            url: `${process.env.API_URL}${url}`,
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${await getCookies('accessToken')}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            try {
                const response = await axios.get(`${process.env.API_URL}/auth/refresh`, {
                    headers: {
                        Cookie: await getHeaderCookies()
                    },
                });

                const renewedAccessToken = response.data.accessToken

                const retryResponse = await axios({
                    url: `${process.env.API_URL}${url}`,
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${renewedAccessToken}`,
                    },
                });

                return retryResponse.data;
            } catch (refreshError) {
                redirect('/')
            }
        }

        throw error;
    }
}