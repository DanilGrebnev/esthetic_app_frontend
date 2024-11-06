'use client'

import { Container } from '@/shared/ui/Container'
import { Dialog } from '@/shared/ui/Dialog'
import { RecommendedPostsList } from '@/widgets/RecommendedPostsList'
import { useState } from 'react'

export const Home = () => {
    const [state, setState] = useState(false)
    const [state2, setState2] = useState(false)
    return (
        <Container>
            <button onClick={() => setState(() => !state)}>
                Toggle dialog
            </button>
            <button onClick={() => setState2(() => !state2)}>
                Toggle dialog
            </button>
            <Dialog
                open={state}
                variant='success'
                closeTimeout={3000}
            >
                Dialog 2
            </Dialog>
            <Dialog
                open={state2}
                variant='warning'
                closeTimeout={3000}
            >
                Dialog 1
            </Dialog>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <RecommendedPostsList />
            </div>
        </Container>
    )
}
