import { ModalContext } from './modalContext'
import { ModalContextProviderProps } from './modalContextType'

export const ModalProvider = ({
    children,
    value,
}: ModalContextProviderProps) => {
    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    )
}
