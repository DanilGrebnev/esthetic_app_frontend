import { formatDistance } from 'date-fns'
import { ru } from 'date-fns/locale'

export const getDateRange = (date: Date) => {
    return formatDistance(new Date(date), new Date(), {
        locale: ru,
        addSuffix: true,
    })
}
