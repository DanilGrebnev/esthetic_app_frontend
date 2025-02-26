import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { ReactNode, Ref, memo, useRef } from 'react'

interface _ProgressWindowTabWrapperProps {
    children: ReactNode
    ref?: Ref<HTMLInputElement>
}
export const _ProgressWindowTabWrapper = memo(
    (props: _ProgressWindowTabWrapperProps) => {
        const { children, ref } = props

        const nodeRef = useRef<HTMLDivElement>(null)
        const combinedRef = useCombinedRef(nodeRef, ref)

        return (
            <div
                className='flex'
                ref={combinedRef}
            >
                {children}
            </div>
        )
    },
)

_ProgressWindowTabWrapper.displayName = '_ProgressWindowTabWrapper'
