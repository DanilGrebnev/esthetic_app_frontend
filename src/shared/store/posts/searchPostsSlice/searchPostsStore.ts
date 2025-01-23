import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    tags: Set<string>
    search: string
}

type Actions = {
    setTags: (tag: string) => void
    deleteTags: (tag: string) => void
    setSearch: (value: string) => void
}

export const useSearchPostsStore = create<State & Actions>()(
    immer((set) => ({
        tags: new Set(),
        search: '',
        setSearch: (value) => {
            set((state) => {
                state.search = value
            })
        },
        setTags: (tag) =>
            set((state) => {
                if (state.tags.has(tag)) return
                state.tags.add(tag)
            }),
        deleteTags: (tag) =>
            set((state) => {
                state.tags.delete(tag)
            }),
    })),
)
