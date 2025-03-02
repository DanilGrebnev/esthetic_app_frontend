import { Button } from '@/shared/ui/Button'
import { CellInput } from '@/shared/ui/CellInput'
import { TCells } from '@/shared/ui/CellInput/model/types'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'
import { Dispatch, SetStateAction, useRef } from 'react'

import { SubTitle } from '../../../SubTitle'
import s from './accept-email.module.scss'

interface AcceptEmailProps {}
export const AcceptEmailTab = (props: AcceptEmailProps) => {
    const ref = useRef<Dispatch<SetStateAction<TCells[]>>>(null)

    const pasteCopiedText = () => {
        navigator.clipboard.readText().then((clipText) => {
            ref.current?.((p) => {
                return p.map((el, i) => {
                    el.value = clipText[i]
                    return el
                })
            })
        })
    }

    return (
        <ProgressWindow.Tab>
            <div className={s.wrapper}>
                <div className={s.content}>
                    <SubTitle>
                        Введите специальный код, отправленный на почту
                    </SubTitle>
                    <div className={s.main_content}>
                        <CellInput
                            validate='number'
                            className={s.input}
                            getStore={(store) => {
                                ref.current = store
                            }}
                            length={5}
                        />
                        <SubTitle>Код подтверждения</SubTitle>
                    </div>
                </div>
                <Button
                    variant='silver'
                    className={s.btn}
                    onClick={pasteCopiedText}
                >
                    Отправить код
                </Button>
            </div>
        </ProgressWindow.Tab>
    )
}
