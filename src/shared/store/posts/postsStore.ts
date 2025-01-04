import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TPostsStoreAction, TPostsStoreState } from './postsStoreType'

export const usePostsStore = create<TPostsStoreState & TPostsStoreAction>()(
    immer((set) => ({
        postsData: {
            name: '',
            description: '',
            image: '',
            link: '',
            dashboard: '',
        },
        postId: '',
        setPostId(postId) {
            set((state) => {
                state.postId = postId
            })
        },
        setPostsData(name, value) {
            set((state) => {
                state.postsData[name as keyof TPostsStoreState['postsData']] =
                    value
            })
        },
        setFileData(file) {
            set((state) => {
                state.postsData.image = file
            })
        },
        deleteFileData() {
            set((state) => {
                state.postsData.image = ''
            })
        },
    })),
)
