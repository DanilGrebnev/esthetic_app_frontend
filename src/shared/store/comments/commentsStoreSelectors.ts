import { useCommentsStore } from './commentsStore'

export const useGetAnswerInfoSelector = () =>
    useCommentsStore((s) => s.answerInfo)
export const useSetAnswerInfoSelector = () =>
    useCommentsStore((s) => s.setAnswerInfo)
export const useSetEditingInfoSelector = () =>
    useCommentsStore((s) => s.setEditingInfo)
export const useGetEditingCommentInfoSelector = () =>
    useCommentsStore((s) => s.editingInfo)
