import { type Tags } from '@/shared/ui/InputWithTags/types'
import { ReactNode } from 'react'

export interface TRecommendedTag extends Tags {
    icon: ReactNode
    isChecked: boolean
}
