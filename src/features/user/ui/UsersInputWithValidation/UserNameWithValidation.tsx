import { ValidationInputs } from '@/shared/ValidationInputs'
import { Input } from '@/shared/ui/Input'
import { forwardRef } from 'react'

interface UserNameWithValidationProps {}

export const UserNameWithValidation = forwardRef<
    HTMLInputElement,
    UserNameWithValidationProps
>((props, ref) => {
    return <Input ref={ref} />
})

UserNameWithValidation.displayName = 'UserNameWithValidation'
