import ky from 'ky'

export const apiInstance = ky.extend({
    prefixUrl: process.env.NEXT_PUBLIC_FETCH_URL,
    retry: 0,
})
