'use client'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/modal'
import {
    type ComponentPropsWithoutRef,
    type FC,
    memo,
    useCallback,
    useState,
} from 'react'

import { DashboardModalList } from '../../DashboardModalList'

interface SaveToDashboardButtonProps
    extends ComponentPropsWithoutRef<'button'> {
    postsId: string
}

export const SaveToDashboardButton: FC<SaveToDashboardButtonProps> = memo(
    ({ className, postsId }) => {
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
