'use client'

import { ReactNode, createContext, useContext } from 'react'

export const DashboardContext = createContext({
    dashboardId: '',
    dashboardName: '',
})

interface DashboardContextProviderProps {
    children: ReactNode

    dashboardInfo: { dashboardName: string; dashboardId: string }
}
export const DashboardContextProvider = (
    props: DashboardContextProviderProps,
) => {
    const { children, dashboardInfo } = props

    return (
        <DashboardContext.Provider value={dashboardInfo}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useGetDashboardContext = () => useContext(DashboardContext)
