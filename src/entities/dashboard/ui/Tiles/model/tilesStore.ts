import { action } from '@storybook/addon-actions'
import { useState } from 'react'

export const useTilesStore = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openChangeModal, setOpenChangeDashboardModal] = useState(false)
    const [hoverOnIcon, setHoverOnIcon] = useState(false)

    const state = { openDialog, openDeleteModal, openChangeModal, hoverOnIcon }

    const actions = {
        setOpenChangeDashboardModal,
        setOpenDialog,
        setHoverOnIcon,
        setOpenDeleteModal,
    }

    return [state, actions] as [typeof state, typeof actions]
}
