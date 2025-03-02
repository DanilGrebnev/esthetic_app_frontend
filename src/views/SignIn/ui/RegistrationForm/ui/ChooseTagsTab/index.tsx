import { recommendedTagsInitial } from '@/shared/data/recommendedTagsData'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'
import { RecommendedTags } from '@/shared/ui/RecommendedTags'
import s from './choose-tags-tab.module.scss'
import { SubTitle } from '../../../SubTitle'

export const ChooseTagsTab = () => {
    return (
        <ProgressWindow.Tab className={s.tag_page}>
            <SubTitle>Выберите теги</SubTitle>
            <RecommendedTags
                name='recommendedTags'
                initialTags={recommendedTagsInitial}
            />
            <SubTitle>Или создайте свои</SubTitle>
            <InputWithTags />
        </ProgressWindow.Tab>
    )
}
