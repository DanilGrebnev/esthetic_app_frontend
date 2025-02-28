'use client'

import { useGetPostsQuery } from '@/shared/api/posts'
import { aspectRatioVariants } from '@/shared/consts/aspectRatioVariants'
import { CellInput } from '@/shared/ui/CellInput'
import { TCells } from '@/shared/ui/CellInput/model/types'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const TestPage = () => {
    const { data, isPending, fetchNextPage } = useGetPostsQuery()

    const [aspectRatio, setAspectRatio] = useState<
        (typeof aspectRatioVariants)[number]
    >(aspectRatioVariants[3])

    return (
        <div>
            <h1>Test page</h1>
            <CellInput
                getResult={(result) => {
                    console.log(result)
                }}
                length={5}
            />
        </div>
    )
}

export default TestPage
