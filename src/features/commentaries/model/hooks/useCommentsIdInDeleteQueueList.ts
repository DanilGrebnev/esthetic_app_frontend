import { consts } from '@/shared/consts'
import { useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export const useCommentsIdInDeleteQueueList = () => {
    const [commentsIdList, setValue, removeValue] = useLocalStorage<string[]>(
        consts.commentsIdOnDeleteQueueKey,
        [],
    )

    const setCommentId = useCallback(
        (commentId: string) => {
            setValue((p) => {
                /* Предостерегаемся от случайного 
                добавления дублирующихся значений */
                const set = new Set(p)
                set.add(commentId)

                return [...set]
            })
        },
        [setValue],
    )

    const removeCommentId = useCallback(
        (commentId: string) => {
            setValue((p) =>
                p.filter((commentIdfromLs) => commentIdfromLs !== commentId),
            )
        },
        [setValue],
    )

    const hasCommentId = useCallback(
        (commentId: string) => commentsIdList.includes(commentId),
        [commentsIdList],
    )

    return { setCommentId, removeCommentId, hasCommentId, commentsIdList }
}
