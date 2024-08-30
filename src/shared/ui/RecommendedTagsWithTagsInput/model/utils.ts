import { type Tag } from '@/shared/ui/InputWithTags/types'

import { type TRecommendedTag } from './types'

type findTagArgs = {
    tagId?: string
    label?: string
}

/* Функция поиска тега среди других тегов */
export const findTag = (
    tagsList: TRecommendedTag[] | Tag[],
    { tagId, label }: findTagArgs,
): TRecommendedTag | Tag | undefined => {
    return tagsList.find(
        (tag) =>
            tag.tagId === tagId ||
            tag.label.toLowerCase().trim() === label?.toLowerCase().trim(),
    )
}

/* Принимает тэг структуры {tagId: string, label: string, isChecked: boolean, icon: ReactNode} и
 * возвращает тэг  {tagId: string, label: string}
 *  */
export const transformTag = (tag: TRecommendedTag): Tag => {
    return { tagId: tag.tagId, label: tag.label }
}
