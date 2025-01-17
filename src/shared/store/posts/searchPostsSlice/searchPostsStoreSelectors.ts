import { useSearchPostsStore } from './searchPostsStore'

export const useGetIncludesActiveTagsInSearchPostsSelector = () => {
    const tags = useSearchPostsStore((s) => s.tags)

    return (tagId: string) => !![...tags].find((value) => value.id === tagId)
}
export const useSetTagInSearchPostSelector = () =>
    useSearchPostsStore((s) => s.setTags)
export const useDeleteTagFromSearchPostSelector = () =>
    useSearchPostsStore((s) => s.deleteTags)
export const useGetActiveTagsFromSearchPostsSelector = () =>
    useSearchPostsStore((s) => [...s.tags])
