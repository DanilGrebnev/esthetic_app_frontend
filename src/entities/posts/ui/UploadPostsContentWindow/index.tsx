'use client'

import { UploadFiles } from '@/shared/ui/UploadFile'
import { readFile } from '@/shared/utils/readFile'
import { type FC, memo } from 'react'

import { usePostsSliceActions } from '../../model/slice'

interface Props {
    className?: string
}

export const UploadPostsContentWindow: FC<Props> = memo(({ className }) => {
    const actions = usePostsSliceActions()

    const onChange = (files: FileList) => {
        readFile(files[0]).then((file) => {
            actions.setFileData(file as string)
        })
    }

    return (
        <UploadFiles
            placeholder={'Нажмите для выбора или перетащите нужный файл'}
            className={className}
            onChange={onChange}
        />
    )
})

UploadPostsContentWindow.displayName = 'UploadPostsContentWindow'
