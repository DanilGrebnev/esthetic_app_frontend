import { useMemo } from 'react'
import { useScreen } from 'usehooks-ts'

/*
 * Расчет количества колонок для списка постов сделанных через virtuoso
 */
export const useCalculateColumnsAmountByScreenSize = () => {
    const { width } = useScreen()

    return useMemo(() => {
        if (width <= 650) {
            return 2
        }
        if (width <= 750) {
            return 3
        }
        if (width <= 1200) {
            return 5
        }
        return 7
    }, [width])
}
