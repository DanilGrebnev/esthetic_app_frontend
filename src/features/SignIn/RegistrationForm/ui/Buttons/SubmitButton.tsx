import { Button } from '@/shared/ui/Button'
import { useProgressWindow } from '@/shared/ui/ProgressWindow'
import { type FC } from 'react'

import { type ButtonTypes } from './types'

export const SubmitButton: FC<ButtonTypes> = ({ disabled, loading }) => {
    const { currentPage } = useProgressWindow()

    return (
        <Button
            disabled={currentPage !== 3 || disabled}
            loading={loading}
            type='submit'
        >
            Отправить
        </Button>
    )
}
