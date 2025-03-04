'use client'

import { useLoginMutation } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { UsersLoginBody } from '@/shared/types/user'
import { Box } from '@/shared/ui/Box'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Dialog } from '@/shared/ui/Dialog'
import { Input } from '@/shared/ui/Input'
import { Text } from '@/shared/ui/Text'
import { validationInputs } from '@/shared/validationInputs'
import { Controller, useForm } from 'react-hook-form'

import { Signature } from '../../Signature'
import s from './login-form.module.scss'

interface LoginFormProps {
    onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
    const { onSuccess } = props
    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<UsersLoginBody>({
        defaultValues: { email: '', password: '' },
    })

    const { mutate, isPending, isSuccess, isError } = useLoginMutation()

    const onSubmit = handleSubmit((body) => {
        mutate(body, { onSuccess })
    })

    return (
        <Container
            size='s'
            className={s.login_container}
        >
            <Box
                boxShadow={true}
                padding='normal'
            >
                <form
                    onSubmit={onSubmit}
                    className={s.form}
                >
                    <Text
                        element='h2'
                        size='font-340'
                    >
                        Войти
                    </Text>
                    <Controller
                        control={control}
                        rules={{
                            required: validationInputs.required.message,
                            pattern: validationInputs.email.pattern,
                        }}
                        name='email'
                        render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    label='Почта'
                                    placeholder='Введите почту'
                                />
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        rules={{ required: validationInputs.required.message }}
                        name='password'
                        render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    label='Пароль'
                                    type='password'
                                    placeholder='Введите пароль'
                                />
                            )
                        }}
                    />
                    <Button
                        disabled={!isValid || isSuccess}
                        type='submit'
                        variant='silver'
                        loading={isPending}
                    >
                        Отправить
                    </Button>
                    <Signature
                        text='Ещё нет аккаунта?'
                        href={routes.registration.getRoute()}
                        linkText='Зарегистрироваться'
                    />
                </form>
                <Dialog
                    className={s.dialog}
                    open={isError}
                    variant='warning'
                    closeTimeout={5000}
                >
                    Ошибка авторизации
                </Dialog>
                <Dialog
                    className={s.dialog}
                    open={isSuccess}
                    variant='success'
                >
                    Авторизация успешна
                </Dialog>
            </Box>
        </Container>
    )
}
