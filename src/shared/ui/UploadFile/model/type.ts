import { TAcceptFiles } from '@/shared/types/acceptAploadFiles'
import type { DragEvent } from 'react'

export interface IUploadFiles {
    onChange?: (files: FileList) => void
    onSetObjectURL?: (objectURL: string) => void
    className?: string
    placeholder?: string
    name?: string
    isError?: boolean
    disabled?: boolean
    acceptFiles?: TAcceptFiles
}

export type TStopPropAndPrevDef = <Cb extends (...args: any) => any>(
    cb: Cb,
) => (...args: Parameters<Cb>) => ReturnType<Cb>

export type TDragEvent = DragEvent<HTMLDivElement>
