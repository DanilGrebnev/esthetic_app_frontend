import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/modal'
import {
    type ComponentPropsWithoutRef,
    type FC,
    memo,
    useCallback,
    useRef,
    useState,
} from 'react'

import { DashboardModalList } from '../DashboardModalList'

interface SaveToDashboardButtonProps
    extends ComponentPropsWithoutRef<'button'> {}

export const SaveToDashboardButton: FC<SaveToDashboardButtonProps> = memo(
    ({ className }) => {
        const [open, setIsOpen] = useState(false)

        const onOpen = useCallback((e: any) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpen(true)
        }, [])

        const onCloseRef = useRef(() => setIsOpen(false))

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
                    onClose={onCloseRef.current}
                >
                    <DashboardModalList isLoading={true} />
                </Modal>
            </>
        )
    },
)

SaveToDashboardButton.displayName = 'SaveToDashboardButton'
