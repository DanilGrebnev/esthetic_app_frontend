import { useQuery } from '@tanstack/react-query'

import { tagsApi } from './TagsApi'

interface IUseGetTagsQueryArgs {
    search: string
}

export const useGetTagsQuery = ({ search }: IUseGetTagsQueryArgs) => {
    return useQuery({
        queryKey: ['tags', search],
        queryFn: ({ signal }) => tagsApi.getTags({ tag_name: search, signal }),
    })
}
