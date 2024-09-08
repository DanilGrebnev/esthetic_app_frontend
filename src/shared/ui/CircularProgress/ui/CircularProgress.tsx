import {
    type CircularProgressProps,
    CircularProgress as Progress,
} from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { type FC } from 'react'

import { type CircularSize } from '../model/circularProgressType'
import { getCircularSize } from '../model/utils'

interface ICircularProgress extends CircularProgressProps {
    /* Заранее предоплередёлнные размеры  */
    sizesVariant?: CircularSize
}

export const CircularProgress: FC<ICircularProgress> = (props) => {
    const { className, sizesVariant, size, ...other } = props

    return (
        <StyledEngineProvider injectFirst={true}>
            <Progress
                className={className}
                size={sizesVariant ? getCircularSize(sizesVariant) : size}
                {...other}
            />
        </StyledEngineProvider>
    )
}
