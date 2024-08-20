import { MutableRefObject } from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type PostsState = {
    postsData: {
        name: string
        description: string
        link: string
        image: string | null
    }
    submitBtnRef: MutableRefObject<HTMLButtonElement | null> | null
    setSubmitButtonRef: (
        submitBtnRef: MutableRefObject<HTMLButtonElement | null> | null,
    ) => void
    setPostsData: (name: string, value: string) => void
    setFileData: (file: string) => void
    deleteFileData: () => void
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
        submitBtnRef: null,
        setSubmitButtonRef(submitBtnRef) {
            set((state) => {
                if (!submitBtnRef) return
                state.submitBtnRef = submitBtnRef as any
            })
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
        deleteFileData() {
            set((state) => {
                state.postsData.image = ''
            })
        },
    })),
)

export const useGetPostsFileSelector = () => {
    return usePostsSlice((state) => state.postsData.image)
}
export const useGetPostsSubmitBtnSelector = () => {
    return usePostsSlice((state) => state.submitBtnRef)
}
export const useGetPostsDataSelector = () => {
    return usePostsSlice((state) => state.postsData)
}

export const usePostsSliceActions = () => {
    return {
        setPostsData: usePostsSlice((state) => state.setPostsData),
        setFileData: usePostsSlice((state) => state.setFileData),
        deleteFileData: usePostsSlice((state) => state.deleteFileData),
        setSubmitButtonRef: usePostsSlice((state) => state.setSubmitButtonRef),
    }
}
