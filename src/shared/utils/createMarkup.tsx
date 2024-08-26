import { ReactElement } from 'react'

export function createMarkup(str: string): ReactElement {
    return <p dangerouslySetInnerHTML={{ __html: `${str}` }}></p>
}
