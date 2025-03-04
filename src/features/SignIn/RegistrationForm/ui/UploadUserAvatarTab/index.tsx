import { UploadUserAvatar } from '@/entities/user'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'
import { Text } from '@/shared/ui/Text'

import s from './s.module.scss'

interface UploadUserAvatarTabProps {
    onChangeAvatar: (file: File) => void
}
export const UploadUserAvatarTab = (props: UploadUserAvatarTabProps) => {
    const { onChangeAvatar } = props

    return (
        <ProgressWindow.Tab className={s.upload_avatar_page}>
            <Text
                element='h3'
                weight='semibold'
                size='font-300'
            >
                Добавьте аватар
            </Text>
            <div className={s.upload_avatar_wrapper}>
                <UploadUserAvatar
                    className={s.upload_avatar}
                    onChange={onChangeAvatar}
                />
            </div>
        </ProgressWindow.Tab>
    )
}
