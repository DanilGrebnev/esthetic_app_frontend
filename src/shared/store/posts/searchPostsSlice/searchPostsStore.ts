import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TSearchPostsTags } from '../../../types/posts'

type TTagItem = Omit<TSearchPostsTags, 'active'>

type State = {
    tags: Set<TTagItem>
}

type Actions = {
    setTags: (tag: TTagItem) => void
    deleteTags: (tagId: string) => void
}

export const useSearchPostsStore = create<State & Actions>()(
    immer((set) => ({
        tags: new Set(),
        setTags: (tag) =>
            set((state) => {
                if (!![...state.tags].find(({ id }) => id === tag.id)) {
                    return
                }
                state.tags.add(tag)
            }),
        deleteTags: (tagId) =>
            set((state) => {
                state.tags.forEach((tag) => {
                    if (tag.id === tagId) {
                        state.tags.delete(tag)
                    }
                })
            }),
    })),
)
