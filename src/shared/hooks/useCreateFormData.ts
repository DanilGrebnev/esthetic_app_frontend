import { type RefObject, useEffect, useRef } from 'react'

/*
 * Создает объект FormData.
 * Возвращает ref, у которого в свойстве current хранится FormData
 * @params ref на форму
 * */
export const useCreateFormData = (
    formRef: RefObject<HTMLFormElement | null>,
) => {
    const formDataRef = useRef<null | FormData>(null)

    useEffect(() => {
        if (!formRef.current) return
        formDataRef.current = new FormData(formRef.current)
    }, [formRef])

    return formDataRef
}
