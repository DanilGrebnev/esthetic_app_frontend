'use client'

import { useRegistrationMutation } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Box } from '@/shared/ui/Box'
import { Container } from '@/shared/ui/Container'
import { Input } from '@/shared/ui/Input'
import { ProgressWindow } from '@/shared/ui/ProgressWindow'
import { TProgressWindowContext } from '@/shared/ui/ProgressWindow/model/types'
import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Signature } from '../../../Signature'
import { SubTitle } from '../../../SubTitle'
import { Title } from '../../../Title'
import { inputsFields } from '../../model/InputFields'
import { useShowToast } from '../../model/hooks'
import { RegistrationFormFields } from '../../model/types'
import { AcceptEmailTab } from '../AcceptEmailTab'
import { NextBtn } from '../Buttons/NextBtn'
import { PrevBtn } from '../Buttons/PrevBtn'
import { SubmitButton } from '../Buttons/SubmitButton'
import { ChooseTagsTab } from '../ChooseTagsTab'
import { UploadUserAvatarTab } from '../UploadUserAvatarTab'
import s from './s.module.scss'

export const RegistrationForm = () => {
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<RegistrationFormFields>({
        mode: 'onBlur',
    })

    const timeoutRef = useRef<NodeJS.Timeout>(undefined)
    const refContext = useRef<TProgressWindowContext>(null)

    const { mutate, isPending, isError, isIdle, isSuccess } =
        useRegistrationMutation()

    useShowToast(isSuccess, isError)

    const onSubmit = handleSubmit((_, e) => {
        const formData = new FormData(e?.target)
        function getTagsFromFormData(key: 'recommendedTags' | 'tags') {
            return JSON.parse((formData.get(key) as string) || '[]')
        }

        formData.set(
            'tags',
            JSON.stringify(
                getTagsFromFormData('tags').concat(
                    getTagsFromFormData('recommendedTags'),
                ),
            ),
        )

        formData.delete('recommendedTags')

        mutate(formData)
    })

    const onChangeAvatar = useCallback((file: File) => {
        setValue('avatar', file)
    }, [])

    const { email, firstName, password, userName } = watch()

    const isValidForm = !!(
        firstName &&
        userName &&
        password &&
        email &&
        isValid
    )
    const disabledNextBtn = isIdle ? !isValidForm : !isValidForm && !isIdle

    /** Листаем страницу далее на страницу с вводом кода
    при успешном ответе от сервера */
    useEffect(() => {
        if (isSuccess) {
            timeoutRef.current = setTimeout(() => {
                refContext?.current?.onNext()
            }, 3000)
        }
    }, [isSuccess])

    return (
        <Container
            size='s'
            className={s.page}
        >
            <Box boxShadow={true}>
                <Title>Регистрация</Title>
                <form
                    onSubmit={onSubmit}
                    className={s.registration_form}
                >
                    <ProgressWindow.Provider
                        getPublicContext={(context) => {
                            refContext.current = context
                        }}
                    >
                        <ProgressWindow.Container>
                            <ProgressWindow.Tab>
                                <div className={s.inputs_wrapper}>
                                    <SubTitle>Заполните информацию</SubTitle>
                                    {inputsFields.map(
                                        ({ label, name, registerOptions }) => {
                                            return (
                                                <Input
                                                    key={name}
                                                    label={label}
                                                    {...register(
                                                        name,
                                                        registerOptions,
                                                    )}
                                                    error={
                                                        !!errors[name]?.message
                                                    }
                                                    helperText={
                                                        errors[name]?.message
                                                    }
                                                />
                                            )
                                        },
                                    )}
                                </div>
                            </ProgressWindow.Tab>
                            <UploadUserAvatarTab
                                onChangeAvatar={onChangeAvatar}
                            />
                            <ChooseTagsTab />
                            {isSuccess && <AcceptEmailTab />}
                        </ProgressWindow.Container>
                        <div className={s.btn_group}>
                            <PrevBtn disabled={isPending} />
                            <NextBtn
                                disabled={disabledNextBtn}
                                onClick={() => {
                                    clearTimeout(timeoutRef.current)
                                }}
                            />
                            <SubmitButton loading={isPending} />
                        </div>
                    </ProgressWindow.Provider>
                </form>
                <Signature
                    text='Уже есть аккаунт?'
                    linkText='Войти'
                    href={routes.login.getRoute()}
                />
            </Box>
        </Container>
    )
}
