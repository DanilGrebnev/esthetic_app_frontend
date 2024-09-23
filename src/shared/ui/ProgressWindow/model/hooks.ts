import {
    PrivateProgressWindowContext,
    ProgressWindowContext,
} from '@/shared/ui/ProgressWindow/model/context/ProgressWindowContext'
import { type Context, useContext } from 'react'

/* Осуществляет проверку на вызов контекста внутри контекст провайдера. */
const useErrorBoundaryContext = <T>(contextProps: Context<T>) => {
    const context = useContext<T>(contextProps)
    if (!context) throw new Error('Use context within provider!')
    return context
}

/* Приватный контекст, нужен для реализации внутренней логики компонента.
 * Не экспортируется пользователю */
export const usePrivateProgressWindowContext = () =>
    useErrorBoundaryContext(PrivateProgressWindowContext)

/* Хук получения контекста */
export const useProgressWindow = () =>
    useErrorBoundaryContext(ProgressWindowContext)