import { useCommentsStore } from './commentsStore'

export const useGetAnswerInfoSelector = () =>
    useCommentsStore((s) => s.answerInfo)
export const useSetAnswerInfoSelector = () =>
    useCommentsStore((s) => s.setAnswerInfo)
export const useGetPostIdSelector = () => useCommentsStore((s) => s.postId)
export const useSetPostIdSelector = () => useCommentsStore((s) => s.setPostId)
export const useSetEditingInfoSelector = () =>
    useCommentsStore((s) => s.setEditingInfo)
export const useGetEditingInfoSelector = () =>
    useCommentsStore((s) => s.editingInfo)
