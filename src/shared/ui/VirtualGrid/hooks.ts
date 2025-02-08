import { useCallback } from 'react'

interface TArgs {
    enabled?: boolean
    endReached?: () => any
}
export const useEndReachedCallback = (args: TArgs) => {
    const { enabled, endReached } = args

    return useCallback(() => {
        if (enabled && endReached) {
            return endReached?.()
        } else {
            return () => {}
        }
    }, [enabled, endReached])
}
