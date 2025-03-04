import { Button } from '@/shared/ui/Button'
import { CellInput } from '@/shared/ui/CellInput'
import { TCells } from '@/shared/ui/CellInput/model/types'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'
import { Text } from '@/shared/ui/Text'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

import s from './accept-email.module.scss'

export const AcceptEmailTab = () => {
    const ref = useRef<Dispatch<SetStateAction<TCells[]>>>(null)
    const [enabled, setEnabled] = useState(false)

    const [submitCodeCount, setSubmitCodeCount] = useState(0)

    const sendCode = () => {
        setSubmitCodeCount((p) => (p += 1))
        setEnabled(true)
    }

    const btnText = !submitCodeCount ? 'Отправить код' : 'Отправить повторно'

    return (
        <ProgressWindow.Tab>
            <div className={s.wrapper}>
                <div className={s.content}>
                    <Text element='h3'>
                        Введите специальный код, отправленный на почту
                    </Text>
                    <div className={s.main_content}>
                        <CellInput
                            validate='number'
                            className={s.input}
                            getStore={(store) => {
                                ref.current = store
                            }}
                            length={5}
                        />
                        <Text element='h3'>Код подтверждения</Text>
                    </div>
                </div>
                <div className='flex flex-col gap-[20px]'>
                    <Button
                        variant='silver'
                        className={s.btn}
                        onClick={sendCode}
                    >
                        {btnText}
                    </Button>
                </div>
            </div>
        </ProgressWindow.Tab>
    )
}
