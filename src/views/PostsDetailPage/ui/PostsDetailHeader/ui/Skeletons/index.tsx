import { Skeleton } from '@/shared/ui/Skeleton'

import s from './s.module.scss'

export const DownloadBtnSkeleton = () => {
    return <Skeleton className={s.download_btn} />
}

export const SaveToDashboardBtnSkeleton = () => {
    return <Skeleton className={s.save_to_dashboard_btn} />
}
