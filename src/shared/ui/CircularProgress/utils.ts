import { type CircularSize } from './circularProgressType'

/*сВозвращает кастомный размер из заранее определённых размеров */
export const getCircularSize = (size: CircularSize) => {
    switch (size) {
        case 's':
            return 20
        case 'm':
            return 25
        case 'l':
            return 30
        case 'xl':
            return 40
    }
}
