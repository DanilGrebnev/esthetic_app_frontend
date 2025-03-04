import { recommendedTagsInitial } from '@/shared/data/recommendedTagsData'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'
import { RecommendedTags } from '@/shared/ui/RecommendedTags'
import { Text } from '@/shared/ui/Text'

import s from './choose-tags-tab.module.scss'

export const ChooseTagsTab = () => {
    return (
        <ProgressWindow.Tab className={s.tag_page}>
            <Text
                element='h3'
                weight='semibold'
                size='font-300'
            >
                Выберите теги
            </Text>
            <RecommendedTags
                name='recommendedTags'
                initialTags={recommendedTagsInitial}
            />
            <Text
                element='h3'
                weight='semibold'
                size='font-300'
            >
                Или создайте свои
            </Text>
            <InputWithTags />
        </ProgressWindow.Tab>
    )
}
