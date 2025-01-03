import { useCommentsStore } from './commentsStore'

export const useGetAnswerInfoSelector = () =>
    useCommentsStore((s) => s.answerInfo)
export const useSetAnswerInfoSelector = () =>
    useCommentsStore((s) => s.setAnswerInfo)
export const useGetPostIdSelector = () => useCommentsStore((s) => s.postId)
export const useSetPostIdSelector = () => useCommentsStore((s) => s.setPostId)
export const useSetEditingInfoSelector = () =>
    useCommentsStore((s) => s.setEditingInfo)
export const useGetEditingCommentInfoSelector = () =>
    useCommentsStore((s) => s.editingInfo)

export const useGetCommentIdQueueDeleteListSelector = () =>
    useCommentsStore((s) => s.commentIdOnDeletionList)
export const useSetCommentIdInQueueDeleteListSelector = () =>
    useCommentsStore((s) => s.addCommentIdInQueueDeleteList)
export const useFilterCommentIdInQueueDeleteListSelector = () =>
    useCommentsStore((s) => s.filterCommentIdOnQueueDeleteList)
