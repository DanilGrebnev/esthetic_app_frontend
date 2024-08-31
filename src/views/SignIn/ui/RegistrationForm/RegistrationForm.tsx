'use client'

import { UploadUserAvatar } from '@/features/user'
import { ValidationInputs } from '@/shared/ValidationInputs'
import { type TCreateUser } from '@/shared/types/user'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { InputWithTags } from '@/shared/ui/InputWithTags'
import { InputWithValidation } from '@/shared/ui/InputWithValidation'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'
import { RecommendedTags } from '@/shared/ui/RecommendedTagsWithTagsInput'
import { SubmitButton } from '@/views/SignIn/ui/RegistrationForm/ui/Buttons/SubmitButton'
import { useForm } from 'react-hook-form'

import { SubTitle } from '../SubTitle'
import { Title } from '../Title'
import { recommendedTagsInitState } from './recommendedTagsData'
import s from './s.module.scss'
import { NextBtn } from './ui/Buttons/NextBtn'
import { PrevBtn } from './ui/Buttons/PrevBtn'

export const RegistrationForm = () => {
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<Omit<TCreateUser, 'tags'>>({
        mode: 'onBlur',
    })

    const onChangeAvatar = (file: File) => {
        setValue('avatar', file)
    }

    const onSubmit = handleSubmit((_, e) => {
        console.clear()
        const formData = new FormData(e?.target)
        const recTags = JSON.parse(
            (formData.get('recommendedTags') as string) || '[]',
        )
        const tags = JSON.parse(
            (formData.get('tags') as string) || '[]',
        ).concat(recTags)

        formData.delete('recommendedTags')
        formData.set('tags', JSON.stringify(tags))

        // fetch('http://localhost:3000/register', {
        //     method: 'POST',
        //     body: formData,
        // })

        for (let f of formData) {
            console.log(f)
        }
    })
    const { email, firstName, password, userName } = watch()

    const nextResolve = firstName && userName && password && email && isValid

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
                    <ProgressWindow.provider>
                        <ProgressWindow.container>
                            <ProgressWindow.tab>
                                <div className={s['inputs-wrapper']}>
                                    <SubTitle>Заполните информацию</SubTitle>
                                    <InputWithValidation
                                        register={register}
                                        label='Имя*'
                                        name='firstName'
                                        errors={errors}
                                        required
                                    />
                                    <InputWithValidation
                                        register={register}
                                        label='Фамилия'
                                        placeholder='Ведите вашу фамилию'
                                        name='lastName'
                                        errors={errors}
                                    />
                                    <InputWithValidation
                                        register={register}
                                        label='Псевдоним пользователя*'
                                        name='userName'
                                        placeholder='Введите желаемый псевдоним'
                                        errors={errors}
                                        required
                                    />
                                    <InputWithValidation
                                        register={register}
                                        label='Пароль*'
                                        name='password'
                                        placeholder='Введите пароль'
                                        errors={errors}
                                        required
                                        validation={{
                                            minLength: {
                                                value: 5,
                                                message:
                                                    'Пароль должен содержать больше 5 символов',
                                            },
                                        }}
                                    />
                                    <Input
                                        label='Почта*'
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
                            </ProgressWindow.tab>
                            <ProgressWindow.tab
                                className={s['upload-avatar-page']}
                            >
                                <SubTitle>Добавьте аватар</SubTitle>
                                <UploadUserAvatar onChange={onChangeAvatar} />
                            </ProgressWindow.tab>
                            <ProgressWindow.tab className={s['tag-page']}>
                                <SubTitle>Выберите теги</SubTitle>
                                <RecommendedTags
                                    name='recommendedTags'
                                    initialTags={recommendedTagsInitState}
                                />
                                <SubTitle>Или создайте свои</SubTitle>
                                <InputWithTags />
                            </ProgressWindow.tab>
                        </ProgressWindow.container>
                        <div className={s['btn-group']}>
                            <PrevBtn />
                            <NextBtn disabled={!nextResolve} />
                            <SubmitButton />
                        </div>
                    </ProgressWindow.provider>
                </form>
            </div>
        </Container>
    )
}
