import { CircleButton } from '@/shared/ui/CircleButton'
import { downloadFileByURL } from '@/shared/utils/downloadFileByURL'
import { type FC, memo } from 'react'

interface DownloadContentBtnProps {
    href: string
    downloadFileName: string
    className?: string
}

export const DownloadFileBtn: FC<DownloadContentBtnProps> = memo((props) => {
    const { className, href, downloadFileName } = props

    const onDownload = () => {
        downloadFileByURL(href, downloadFileName)
    }

    return (
        <CircleButton
            className={className}
            onClick={(e) => {
                e.stopPropagation()
                onDownload()
            }}
        />
    )
})
DownloadFileBtn.displayName = 'DownloadFileBtn'
