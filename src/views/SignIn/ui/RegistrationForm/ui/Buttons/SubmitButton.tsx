import { Button } from '@/shared/ui/Button'
import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { type FC } from 'react'

import { type ButtonTypes } from './types'

export const SubmitButton: FC<ButtonTypes> = ({ disabled }) => {
    const { currentPage } = useProgressWindow()

    return (
        <Button
            disabled={currentPage !== 3}
            type='submit'
        >
            Отправить
        </Button>
    )
}
