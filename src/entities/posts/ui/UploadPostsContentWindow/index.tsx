'use client'

import { UploadFiles } from '@/shared/ui/UploadFile'
import { type FC } from 'react'

import { usePostsSliceActions } from '../../model/slice'

interface Props {
    className?: string
}

export const UploadPostsContentWindow: FC<Props> = ({ className }) => {
    const actions = usePostsSliceActions()

    const onChange = (file: string) => {
        actions.setFileData(file)
    }

    return (
        <UploadFiles
            placeholder={'Нажмите для выбора или перетащите нужный файл'}
            className={className}
            onChange={onChange}
        />
    )
}
