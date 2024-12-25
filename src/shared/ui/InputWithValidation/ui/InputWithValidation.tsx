import { Input } from '@/shared/ui/Input'
import { validationInputs } from '@/shared/validationInputs'
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
    defaultValue?: string
}

export const InputWithValidation = <T extends FieldValues>(
    props: InputWithValidationProps<T>,
) => {
    const {
        register,
        name,
        defaultValue,
        required,
        validation,
        errors,
        ...other
    } = props

    const requiredOptions = required && {
        value: true,
        message: validationInputs.required.message,
    }

    return (
        <Input
            defaultValue={defaultValue}
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
