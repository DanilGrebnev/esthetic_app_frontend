import { useEffect, useRef, useState } from 'react'

interface UseDialog {
    open?: boolean
    closeTimeout?: number
}

export const useDialog = (args: UseDialog) => {
    const { open, closeTimeout } = args
    const [isOpen, setOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (open) setOpen(true)

        if (!open) {
            setOpen(false)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            return
        }

        if (closeTimeout) {
            timeoutRef.current = setTimeout(setOpen, closeTimeout, false)
        }
    }, [open, closeTimeout])

    return { isOpen }
}
