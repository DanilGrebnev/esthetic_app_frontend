import { type ChangeEvent, RefObject, SetStateAction } from 'react'

import type { IUploadFiles, TDragEvent, TStopPropAndPrevDef } from './type'

/* Принимает функцию, и возвращает другую функцию с вызванными
 * e.stopPropagation() и e.preventDefault() */
export const stopPropAndPrevDef: TStopPropAndPrevDef = (cb) => {
    if (typeof cb !== 'function') throw Error('Arguments must be a function')
    return (...args) => {
        if ('preventDefault' in args[0] && 'stopPropagation' in args[0]) {
            args[0]?.preventDefault()
            args[0]?.stopPropagation()
        } else {
            throw Error(
                'argument does not include preventDefault and stopPropagation',
            )
        }

        return cb(...args)
    }
}

export const createObjectBlobUrl = (file: File) => {
    return URL.createObjectURL(file)
}

/* Создаёт обработчик события, который срабатывает на событие onChange поля input type=file */
export const createOnChange =
    (props: IUploadFiles) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { files } = target
        if (!files) return
        props?.onChange?.(files)
        const objectBlobUrl = createObjectBlobUrl(files[0])
        props.onSetObjectURL?.(objectBlobUrl)
    }

/* Создаёт обработчик события onDrop, который срабатывает при перетаскивании и отпускании файла */
export const createOnDrop = (
    props: IUploadFiles,
    inputRef: RefObject<HTMLInputElement>,
    setIsOver: (value: SetStateAction<boolean>) => void,
) =>
    stopPropAndPrevDef(({ dataTransfer }: TDragEvent) => {
        const { files } = dataTransfer
        props.onChange?.(files)
        props.onSetObjectURL?.(createObjectBlobUrl(files[0]))
        if (!inputRef.current) return
        inputRef.current.files = dataTransfer.files
        setIsOver(false)
    })
