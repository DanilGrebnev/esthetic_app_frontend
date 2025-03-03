'use client'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/modal'
import {
    type ComponentPropsWithoutRef,
    memo,
    useCallback,
    useState,
} from 'react'

import { DashboardModalList } from '../../DashboardModalList'

interface SaveToDashboardButtonProps
    extends ComponentPropsWithoutRef<'button'> {
    postsId: string
}

export const SaveToDashboardButton = memo(
    ({ className, postsId }: SaveToDashboardButtonProps) => {
        const [open, setIsOpen] = useState(false)

        const onOpen = useCallback((e: any) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(true)
        }, [])

        const onClose = useCallback(() => {
            setIsOpen(false)
        }, [])

        return (
            <>
                <Button
                    variant='red'
                    size='m'
                    className={className}
                    onClick={onOpen}
                >
                    Сохранить
                </Button>
                <Modal
                    isOpen={open}
                    onClose={onClose}
                >
                    <DashboardModalList postsId={postsId} />
                </Modal>
            </>
        )
    },
)

SaveToDashboardButton.displayName = 'SaveToDashboardButton'
