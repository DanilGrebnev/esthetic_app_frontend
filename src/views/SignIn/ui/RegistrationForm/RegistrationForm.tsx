'use client'

import { UploadUserAvatar, UserInputWithValidation } from '@/features/user'
import { ValidationInputs } from '@/shared/ValidationInputs'
import { type CreateUserDTO } from '@/shared/types/user'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import {
    ProgressWindowContainer,
    ProgressWindowProvider,
    ProgressWindowTab,
} from '@/shared/ui/ProgressWindow'
import { PageTitle } from '@/views/SignIn/ui/RegistrationForm/ui/PageTitle'
import { useForm } from 'react-hook-form'

import { Title } from '../Title'
import s from './s.module.scss'
import { NextBtn } from './ui/NextBtn'
import { PrevBtn } from './ui/PrevBtn'
import { SelectRecommendedTags } from './ui/SelectRecommendedTags'

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Omit<CreateUserDTO, 'tags'>>({
        mode: 'onBlur',
        defaultValues: {
            email: 'grebnevdanil60@gmail.com',
            firstName: 'Dani',
            userName: 'nagibator228',
            password: 'htczte2101',
        },
    })

    const onChangeAvatar = (file: File) => {
        setValue('avatar', file)
    }

    const onSubmit = handleSubmit((_, e) => {
        const formData = new FormData(e?.target)

        fetch('http://localhost:3000/register', {
            method: 'POST',
            body: formData,
        })

        for (let f of formData) {
            console.log(f)
        }
    })

    return (
        <Container
            size='s'
            className={s.page}
        >
            <div className={s['progress-window-wrapper']}>
                <Title text='Регистрация' />
                <form
                    onSubmit={onSubmit}
                    className={s['registration-form']}
                >
                    <ProgressWindowProvider>
                        <ProgressWindowContainer>
                            <ProgressWindowTab>
                                <div className={s['inputs-wrapper']}>
                                    <PageTitle>Заполните информацию</PageTitle>
                                    <UserInputWithValidation
                                        register={register}
                                        label='Имя'
                                        name='firstName'
                                        errors={errors}
                                        required
                                    />
                                    <UserInputWithValidation
                                        register={register}
                                        label='Фамилия'
                                        placeholder='Ведите вашу фамилию'
                                        name='lastName'
                                        errors={errors}
                                    />
                                    <UserInputWithValidation
                                        register={register}
                                        label='Псевдоним пользователя'
                                        name='userName'
                                        placeholder='Введите желаемый псевдоним'
                                        errors={errors}
                                        required
                                    />
                                    <UserInputWithValidation
                                        register={register}
                                        label='Пароль'
                                        name='password'
                                        placeholder='Введите пароль'
                                        errors={errors}
                                        required
                                    />
                                    <Input
                                        label='Почта'
                                        placeholder='Введите почту'
                                        {...register('email', {
                                            required:
                                                ValidationInputs.required
                                                    .message,
                                            pattern: {
                                                value: ValidationInputs.email
                                                    .pattern,
                                                message:
                                                    ValidationInputs.email
                                                        .message,
                                            },
                                        })}
                                        error={!!errors.email?.message}
                                        helperText={errors.email?.message}
                                    />
                                </div>
                            </ProgressWindowTab>
                            <ProgressWindowTab
                                className={s['upload-avatar-page']}
                            >
                                <PageTitle>Добавьте аватар</PageTitle>
                                <UploadUserAvatar onChange={onChangeAvatar} />
                            </ProgressWindowTab>
                            <ProgressWindowTab>
                                <PageTitle>Выберите теги</PageTitle>
                                <SelectRecommendedTags />
                            </ProgressWindowTab>
                        </ProgressWindowContainer>
                        <div className={s['btn-group']}>
                            <PrevBtn />
                            <NextBtn />
                            <Button type='submit'>Отправить</Button>
                        </div>
                    </ProgressWindowProvider>
                </form>
            </div>
        </Container>
    )
}
