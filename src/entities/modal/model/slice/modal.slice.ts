import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ModalState {
    isOpen: boolean
    openModal: () => void
}

const useModal = create<ModalState>()(
    immer((set) => ({
        isOpen: false,
        openModal: () =>
            set((state) => {
                state.isOpen = true
            }),
        closeModal: () =>
            set((state) => {
                state.isOpen = false
            }),
    })),
)

export const useIsOpenModal = () => {
    return useModal((state) => state.isOpen)
}
export const useOpenModal = () => {
    return useModal((state) => state.openModal)
}
export const useCloseModal = () => {
    return useModal((state) => state.openModal)
}
