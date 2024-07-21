'use client'

import { readFile } from '@/shared/utils/readFile'
import { Button, StyledEngineProvider } from '@mui/material'
import { ChangeEvent, type FC, useRef } from 'react'

import { usePostsSliceActions } from '../../model/slice'

type UploadPostsContentBtnProps = Parameters<typeof Button>[0]

export const UploadPostsContentBtn: FC<UploadPostsContentBtnProps> = (
    props,
) => {
    const { ...other } = props
    const setFile = usePostsSliceActions().setFileData
    const inputRef = useRef<HTMLInputElement>(null)

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const result = await readFile(e.target.files?.[0])
        setFile(result)
    }

    return (
        <StyledEngineProvider injectFirst>
            <Button onClick={() => inputRef.current?.click()} {...other}>
                Загрузить
            </Button>
            <input
                onChange={onChange}
                ref={inputRef}
                name='img'
                hidden={true}
                accept='image/*'
                type='file'
            />
        </StyledEngineProvider>
    )
}
