import { api } from '@/shared/api/Instance'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import { IUseGetTagsResponse } from '@/shared/types/tags'

class TagsApi {
    baseUrl = 'tags'
    getTags = ({ signal, tag_name }: ArgsWithSignal<{ tag_name: string }>) =>
        api
            .get(this.baseUrl, {
                signal,
                searchParams: {
                    tag_name,
                },
            })
            .json<IUseGetTagsResponse>()
}

export const tagsApi = new TagsApi()
