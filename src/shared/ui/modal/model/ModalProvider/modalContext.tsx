'use client'

import { createContext, useContext } from 'react'

import { TModalContext } from './modalContextType'

export const ModalContext = createContext({} as TModalContext)

export const useModalContext = () => {
    return useContext(ModalContext)
}
