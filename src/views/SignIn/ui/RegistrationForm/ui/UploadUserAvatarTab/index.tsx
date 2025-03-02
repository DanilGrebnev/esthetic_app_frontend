import { UploadUserAvatar } from '@/features/user'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'

import { SubTitle } from '../../../SubTitle'
import s from './s.module.scss'

interface UploadUserAvatarTabProps {
    onChangeAvatar: (file: File) => void
}
export const UploadUserAvatarTab = (props: UploadUserAvatarTabProps) => {
    const { onChangeAvatar } = props

    return (
        <ProgressWindow.Tab className={s.upload_avatar_page}>
            <SubTitle>Добавьте аватар</SubTitle>
            <div className={s.upload_avatar_wrapper}>
                <UploadUserAvatar
                    className={s.upload_avatar}
                    onChange={onChangeAvatar}
                />
            </div>
        </ProgressWindow.Tab>
    )
}
