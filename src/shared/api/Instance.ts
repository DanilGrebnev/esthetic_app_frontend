import ky from 'ky'

export const apiInstance = ky.extend({
    prefixUrl: 'http://91.202.207.229:8000',
    // prefixUrl: 'http://127.0.0.1:8000',
    retry: 0,
})
