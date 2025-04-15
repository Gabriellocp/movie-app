'use server'

import { cookies } from "next/headers"

export const getCookies = async (value: string) => {
    const cookie = await cookies()
    return cookie.get(value)?.value
}

export const getHeaderCookies = async () => (await cookies()).toString()
