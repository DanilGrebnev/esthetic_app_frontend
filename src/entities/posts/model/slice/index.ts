import { createSelectorHooks } from 'auto-zustand-selectors-hook'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { File } from '../../types'

type PostsState = {
    postsData: {
        name: string
        description: string
        link: string
        image: File
        dashboard: string
    }
    setPostsData: (name: string, value: string) => void
    setFileData: (file: File) => void
}

export const usePostsSlice = create<PostsState>()(
    immer((set) => ({
        postsData: {
            name: '',
            description: '',
            image: '',
            link: '',
            dashboard: '',
        },

        setPostsData(name, value) {
            set((state) => {
                state.postsData[name as keyof PostsState['postsData']] = value
            })
        },
        setFileData(file) {
            set((state) => {
                state.postsData.image = file
            })
        },
    })),
)

export const useGetPostsImageSelector = () => {
    return usePostsSlice((state) => state.postsData.image)
}

export const usePostsSliceActions = () => {
    return {
        setPostsData: usePostsSlice((state) => state.setPostsData),
        setFileData: usePostsSlice((state) => state.setFileData),
    }
}
