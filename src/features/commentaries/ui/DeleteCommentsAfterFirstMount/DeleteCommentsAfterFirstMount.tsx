'use client'

import { useDeleteCommentsByCommentsIdListMutation } from '@/shared/api/comments'
import { Layout } from '@/shared/types/layout'
import { useEffect } from 'react'

/* 
    Сработает при первом рендере приложения.
    При аварийном закрытии браузера, список комментариев не очистится. 
    При первом монтировании приложения произойдёт повторная проверка на наличие неочищенных комментариев
    в локальном хранилище и их последующее удаление.
*/
export const DeleteCommentsAfterFirstMount = ({ children }: Layout) => {
    const { mutate } = useDeleteCommentsByCommentsIdListMutation()

    useEffect(() => {
        mutate(undefined)
    }, [])

    return <>{children}</>
}
