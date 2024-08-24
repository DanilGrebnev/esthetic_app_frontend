'use client'

import { createContext } from 'react'

import type {
    TPrivateProgressWindowContext,
    TProgressWindowContext,
} from '../types'

export const ProgressWindowContext =
    createContext<TProgressWindowContext | null>(null)

export const PrivateProgressWindowContext =
    createContext<TPrivateProgressWindowContext | null>(null)
