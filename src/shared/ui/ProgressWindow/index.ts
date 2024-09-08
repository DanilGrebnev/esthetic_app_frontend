import { ProgressWindowProvider } from './model/context/ProgressWindowProvider'
import { ProgressWindowContainer } from './ui/ProgressWindowContainer'
import { ProgressWindowTab } from './ui/ProgressWindowTabDynamic'

export { useProgressWindow } from './model/hooks'

export const ProgressWindow = {
    container: ProgressWindowContainer,
    provider: ProgressWindowProvider,
    tab: ProgressWindowTab,
}
