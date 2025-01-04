import { useEditCommentsMutations } from '@/shared/api/comments'
import { useSetAnswerInfoSelector } from '@/shared/store/comments'
import toast from 'react-hot-toast'

export const useAnswerOnComment = () => {
    const setAnswerInfo = useSetAnswerInfoSelector()
    const { mutateAsync } = useEditCommentsMutations()

    return async (...args: Parameters<typeof mutateAsync>) => {
        try {
            await mutateAsync(...args)
            toast.success('Ответ опубликован')
            setAnswerInfo({ commentId: null, userName: null })

            return Promise.resolve()
        } catch (err) {
            toast.error('Ошибка ответа на комментарий')

            return Promise.reject(err)
        }
    }
}
