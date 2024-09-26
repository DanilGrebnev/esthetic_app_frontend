import { createContext, useContext } from 'react'

type Context = { postsId: string }

export const MenuPostBtnContext = createContext<Context>({} as Context)

export const useMenuPostBtnContext = () => {
    return useContext(MenuPostBtnContext)
}
