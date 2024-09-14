import { ReactElement } from 'react'

/* Функция для вставка html */
export function createMarkup(str: string): ReactElement {
    return <p dangerouslySetInnerHTML={{ __html: `${str}` }}></p>
}
