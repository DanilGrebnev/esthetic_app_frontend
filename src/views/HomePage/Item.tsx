import { type FC, memo } from 'react'

interface Item {
    id: number
    name: string
}

export const Item: FC<Item> = memo(({ id, name }) => {
    return (
        <div
            style={{
                display: 'flex',
                padding: '20px',
                border: '1px solid black',
                justifyContent: 'space-between',
            }}
        >
            <p style={{ fontWeight: 'bold' }}>{id}</p>
            <p>{name}</p>
        </div>
    )
})

Item.displayName = 'Item'
