import t1 from '@/shared/assets/t1.jpg'
import t2 from '@/shared/assets/t2.jpg'
import t3 from '@/shared/assets/t3.jpg'
import t4 from '@/shared/assets/t4.jpg'
import t5 from '@/shared/assets/t5.jpg'
import t6 from '@/shared/assets/t6.jpg'
import t7 from '@/shared/assets/t7.jpg'
import t8 from '@/shared/assets/t8.jpg'
import t9 from '@/shared/assets/t9.jpg'
import t10 from '@/shared/assets/t10.jpg'
import { getRandomElementFromArray as ran } from '@/shared/util/getRandomElementFromArr'

const asp = ['9/16', '2/3', '3/4', '4/5', '1/1']
const imgs = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10] as any as string[]

export const mock = Array(150)
    .fill('')
    .map(() => ({ url: ran(imgs), aspect: ran(asp) }))
