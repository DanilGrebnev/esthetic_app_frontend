import { ProgressWindowProvider } from './model/ProgressWindowProvider'
import { ProgressWindowContainer } from './ui/ProgressWindowContainer'
import { ProgressWindowTab } from './ui/ProgressWindowTab'

export { useProgressWindow } from './model/hooks'

export const ProgressWindow = {
    Container: ProgressWindowContainer,
    Provider: ProgressWindowProvider,
    Tab: ProgressWindowTab,
}
