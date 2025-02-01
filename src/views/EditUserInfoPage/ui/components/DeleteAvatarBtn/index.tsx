'use client'

import { useDeleteProfileAvatarMutation } from '@/shared/api/users'
import { Button } from '@/shared/ui/Button'
import { BaseModalWindow, Modal } from '@/shared/ui/modal'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const DeleteAvatarBtn = () => {
    const [openModal, setOpenModal] = useState(false)
    const { mutate, isPending } = useDeleteProfileAvatarMutation()

    return (
        <>
            <Button
                size='m'
                variant='silver'
                onClick={() => setOpenModal(true)}
            >
                Удалить аватар
            </Button>
            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            >
                <BaseModalWindow className='flex flex-col gap-[--global-gap-1]'>
                    <p>Удалить аватар?</p>
                    <div className='flex gap-[--global-gap-1]'>
                        <Button
                            loading={isPending}
                            variant='silver'
                            onClick={() =>
                                mutate('', {
                                    onSettled: () => {
                                        setOpenModal(false)
                                    },
                                    onError: () => {
                                        toast.error('Ошибка удаления аватара')
                                    },
                                })
                            }
                        >
                            Удалить
                        </Button>
                        <Button
                            disabled={isPending}
                            variant='standart'
                            onClick={() => setOpenModal(false)}
                        >
                            Отмена
                        </Button>
                    </div>
                </BaseModalWindow>
            </Modal>
        </>
    )
}
