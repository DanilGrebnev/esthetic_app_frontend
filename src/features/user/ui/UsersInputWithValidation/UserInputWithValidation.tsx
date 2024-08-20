import { ValidationInputs } from '@/shared/ValidationInputs'
import { Input } from '@/shared/ui/Input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type RegisterType<T extends FieldValues> = UseFormRegister<T>

interface UserNameWithValidationProps<T extends FieldValues> {
    register: RegisterType<T>
    label: string
    name: ReturnType<RegisterType<T>>['name']
    placeholder?: string
    required?: boolean
    disabled?: boolean
    errors: any
}

export const UserInputWithValidation = <T extends FieldValues>(
    props: UserNameWithValidationProps<T>,
) => {
    const { register, name, required, errors, ...other } = props

    const requiredOptions = required && {
        value: true,
        message: ValidationInputs.required.message,
    }

    return (
        <Input
            {...register(name, {
                required: requiredOptions,
            })}
            {...other}
            error={!!errors[name]}
            helperText={errors[name]?.message}
        />
    )
}

UserInputWithValidation.displayName = 'UserNameWithValidation'
