import { type FC, memo } from 'react'

interface Item {
    id: number
    name: string
}

export const Item: FC<Item> = memo(({ id, name }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid black' }}>{name}</div>
    )
})

Item.displayName = 'Item'
