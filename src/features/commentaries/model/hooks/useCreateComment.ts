import { useEditCommentsMutations } from '@/shared/api/comments'
import { useSetEditingInfoSelector } from '@/shared/store/comments'
import toast from 'react-hot-toast'

export const useCreateComment = () => {
    const { mutateAsync } = useEditCommentsMutations()
    const setEditInfo = useSetEditingInfoSelector()

    return async (...args: Parameters<typeof mutateAsync>) => {
        try {
            await mutateAsync(...args)
            toast.success('Изменение комментария успешно')
            setEditInfo({ commentId: null, text: null })

            return Promise.resolve()
        } catch (err) {
            toast.error('Ошибка изменения комментария')

            return Promise.reject()
        }
    }
}
