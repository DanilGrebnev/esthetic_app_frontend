import ky from 'ky'

export const apiInstance = ky.extend({ prefixUrl: 'http://localhost:8000' })
