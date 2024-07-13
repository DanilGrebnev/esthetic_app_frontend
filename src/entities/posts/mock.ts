import { getRandomElementFromArray as ran } from '@/shared/util/getRandomElementFromArr'

const t10 = 'http://localhost:3000//assets/t10.jpg'
const t1 = 'http://localhost:3000/assets/t1.jpg'
const t2 = 'http://localhost:3000/assets/t2.jpg'
const t3 = 'http://localhost:3000/assets/t3.jpg'
const t4 = 'http://localhost:3000/assets/t4.jpg'
const t5 = 'http://localhost:3000/assets/t5.jpg'
const t6 = 'http://localhost:3000/assets/t6.jpg'
const t7 = 'http://localhost:3000/assets/t7.jpg'
const t8 = 'http://localhost:3000/assets/t8.jpg'
const t9 = 'http://localhost:3000/assets/t9.jpg'

const asp = ['9/16', '2/3', '3/4', '4/5', '1/1']
const imgs = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10] as any as string[]

export const mock = Array(150)
    .fill('')
    .map(() => ({ url: ran(imgs), aspect: ran(asp) }))
