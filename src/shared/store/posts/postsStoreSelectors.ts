import { usePostsStore } from './postsStore'

export const useGetPostsFileSelector = () => {
    return usePostsStore((state) => state.postsData.image)
}

export const useGetPostsDataSelector = () => {
    return usePostsStore((state) => state.postsData)
}

export const usePostsSliceActions = () => {
    return {
        setPostsData: usePostsStore((state) => state.setPostsData),
        setFileData: usePostsStore((state) => state.setFileData),
        deleteFileData: usePostsStore((state) => state.deleteFileData),
    }
}

export const useGetPostIdSelector = () => usePostsStore((s) => s.postId)
export const useSetPostIdSelector = () => usePostsStore((s) => s.setPostId)
