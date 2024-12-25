'use client'

import { useLoginMutation } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { UsersLoginBody } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Dialog } from '@/shared/ui/Dialog'
import { Input } from '@/shared/ui/Input'
import { validationInputs } from '@/shared/validationInputs'
import { Signature } from '@/views/SignIn/ui/Signature'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

import { Title } from '../../Title'
import s from './login-form.module.scss'

export const LoginForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<UsersLoginBody>({
        defaultValues: { email: '', password: '' },
    })
    const router = useRouter()

    const { mutate, isPending, isSuccess, isError } = useLoginMutation()

    const onSubmit = handleSubmit((body) => {
        mutate(body, {
            onSuccess: () => router.push(routes.main.getRoute()),
        })
    })

    return (
        <>
            <Container
                size='s'
                className={s['login-form']}
            >
                <form
                    onSubmit={onSubmit}
                    className={s.form}
                >
                    <Title text='Войти' />
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
                        disabled={!isValid}
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
            </Container>
        </>
    )
}
