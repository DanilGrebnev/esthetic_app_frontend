import { Button } from '@/shared/ui/Button'
import { CellInput } from '@/shared/ui/CellInput'

import { SubTitle } from '../../../SubTitle'
import s from './accept-email.module.scss'

export const AcceptEmail = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <SubTitle>
                    Введите специальный код, отправленный на почту
                </SubTitle>
                <CellInput
                    className={s.input}
                    length={5}
                />
            </div>
            <Button
                variant='silver'
                className={s.btn}
            >
                Отправить код
            </Button>
        </div>
    )
}
