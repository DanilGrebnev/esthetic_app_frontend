import { routes } from '@/shared/routes'
import { Box } from '@/shared/ui/Box'
import Link from 'next/link'

import { Text } from '../Text'
import s from './not-auth-comments-prompt.module.scss'

interface NotAuthMessageProps {
    prefixText?: string
}
export const NotAuthMessage = ({ prefixText }: NotAuthMessageProps) => {
    return (
        <Box className={s.message}>
            <Link
                className={s.link}
                href={routes.login.getRoute()}
            >
                Войдите&nbsp;
            </Link>
            <Text element='p'>или&nbsp;</Text>

            <Link
                className={s.link}
                href={routes.registration.getRoute()}
            >
                Зарегистрируйтесь,&nbsp;
            </Link>
            <Text element='p'>{prefixText}</Text>
        </Box>
    )
}
