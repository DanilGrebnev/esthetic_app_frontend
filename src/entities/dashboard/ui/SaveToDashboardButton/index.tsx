import { DashboardList } from '@/entities/dashboard'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/modal'
import {
    type ComponentPropsWithoutRef,
    type FC,
    memo,
    useCallback,
    useState,
} from 'react'

interface SaveToDashboardButtonProps
    extends ComponentPropsWithoutRef<'button'> {}

export const SaveToDashboardButton: FC<SaveToDashboardButtonProps> = memo(
    ({ className }) => {
        const [open, setIsOpne] = useState(false)

        const onOpen = useCallback((e: any) => {
            e.preventDefault()
            e.stopPropagation()
            setIsOpne(true)
        }, [])

        const onClose = useCallback(() => {
            setIsOpne(false)
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
                    <DashboardList isLoading={true} />
                </Modal>
            </>
        )
    },
)

SaveToDashboardButton.displayName = 'SaveToDashboardButton'
