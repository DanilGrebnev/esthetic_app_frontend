import { ComponentPropsWithRef } from 'react'

type TFontSizeLis = 100 | 200 | 300 | 340 | 350 | 400 | 500 | 600
export type TFontSize = `font-${TFontSizeLis}`
type TTitleNumber = 1 | 2 | 3 | 4 | 5 | 6
export type TTitle = `h${TTitleNumber}`

export type AppliedTags = TTitle | 'p' | 'span' | 'a'

export type GetTagType<T extends AppliedTags> = ComponentPropsWithRef<T>

export type TWeight = 'normal' | 'semibold' | 'bold'
