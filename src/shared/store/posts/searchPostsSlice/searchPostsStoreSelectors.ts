import { useSearchPostsStore } from './searchPostsStore'

export const useGetIncludesActiveTagsInSearchPostsSelector = () => {
    const tags = useSearchPostsStore((s) => s.tags)

    return (tag: string) => tags.has(tag)
}
export const useSetSearchValueSelector = () => {
    return useSearchPostsStore((s) => s.setSearch)
}
export const useGetSearchValueSelector = () => {
    return useSearchPostsStore((s) => s.search)
}

export const useGetSearchPostsPayloadFromActiveTags = () => {
    const tags = useSearchPostsStore((s) => s.tags)

    return [...tags].join(',')
}

export const useSetTagInSearchPostSelector = () =>
    useSearchPostsStore((s) => s.setTags)
export const useDeleteTagFromSearchPostSelector = () =>
    useSearchPostsStore((s) => s.deleteTags)
export const useGetActiveTagsFromSearchPostsSelector = () =>
    useSearchPostsStore((s) => [...s.tags])
