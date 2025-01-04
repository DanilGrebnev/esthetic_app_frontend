export interface TPostsStoreState {
    postsData: {
        name: string
        description: string
        link: string
        image: string | null
    }
    postId: string
}

export interface TPostsStoreAction {
    setPostsData: (name: string, value: string) => void
    setFileData: (file: string) => void
    deleteFileData: () => void
    setPostId: (postId: string) => void
}
