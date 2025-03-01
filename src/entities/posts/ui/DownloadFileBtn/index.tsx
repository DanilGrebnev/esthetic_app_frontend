'use client'

import { CircleButton } from '@/shared/ui/CircleButton'
import { downloadFileByURL } from '@/shared/utils/downloadFileByURL'
import { type FC, memo } from 'react'

interface DownloadContentBtnProps {
    href: string
    downloadFileName: string
    className?: string
}

export const DownloadFileBtn = memo((props: DownloadContentBtnProps) => {
    const { className, href, downloadFileName } = props

    const onDownload = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        downloadFileByURL(href, downloadFileName)
    }

    return (
        <CircleButton
            className={className}
            onClick={onDownload}
        />
    )
})
DownloadFileBtn.displayName = 'DownloadFileBtn'
