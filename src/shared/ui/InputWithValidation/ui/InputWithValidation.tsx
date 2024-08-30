import { ValidationInputs } from '@/shared/ValidationInputs'
import { Input } from '@/shared/ui/Input'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type RegisterType<T extends FieldValues> = UseFormRegister<T>

interface InputWithValidationProps<T extends FieldValues> {
    register: RegisterType<T>
    label: string
    name: ReturnType<RegisterType<T>>['name']
    placeholder?: string
    required?: boolean
    disabled?: boolean
    errors?: any
    validation?: Parameters<RegisterType<T>>[1]
    type?: Parameters<typeof Input>[0]['type']
}

export const InputWithValidation = <T extends FieldValues>(
    props: InputWithValidationProps<T>,
) => {
    const { register, name, required, validation, errors, ...other } = props

    const requiredOptions = required && {
        value: true,
        message: ValidationInputs.required.message,
    }

    return (
        <Input
            {...register(name, {
                required: requiredOptions,
                ...validation,
            })}
            {...other}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
        />
    )
}

InputWithValidation.displayName = 'InputWithValidation'