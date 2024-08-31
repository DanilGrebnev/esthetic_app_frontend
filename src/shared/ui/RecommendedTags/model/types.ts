import { type Tag } from '@/shared/ui/InputWithTags/types'
import { ReactNode } from 'react'

export interface TRecommendedTag extends Tag {
    icon: ReactNode
    isChecked: boolean
}

export interface TRecommendedTags {
    initialTags?: TRecommendedTag[]
    name?: string
}
