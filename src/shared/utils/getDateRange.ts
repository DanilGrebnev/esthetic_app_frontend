import { type FormatDistanceFnOptions, formatDistance } from 'date-fns'
import { ru } from 'date-fns/locale'

export const getDateRange = (
    date: Date | string,
    options?: FormatDistanceFnOptions,
) => {
    return formatDistance(new Date(date), new Date(), {
        locale: ru,
        includeSeconds: true,
        addSuffix: true,
        ...options,
    })
}
