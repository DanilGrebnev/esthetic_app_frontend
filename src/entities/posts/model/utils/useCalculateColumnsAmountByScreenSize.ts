import { useScreen } from 'usehooks-ts'

/*
Расчет количества колонок для списка постов
*/
export const useCalculateColumnsAmountByScreenSize = () => {
    const { width } = useScreen()

    if (width <= 500) {
        return 1
    }
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
}
