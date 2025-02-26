import { TSetting } from './types'

/* Принимает в себя настройки компонента и возвращает их в нужном виде */
export const getSetting = (setting?: TSetting) => {
    if (!setting) return
    const transition = setting?.transition
        ? setting.transition + 's'
        : undefined

    return { transition }
}

export function setTabIndexOnInputs(
    node: HTMLElement | null,
    disabled: boolean,
) {
    if (!node) return

    const elements = node?.querySelectorAll('*')

    if (!elements.length) return

    elements.forEach((el) => {
        if (disabled) {
            el.setAttribute('tabindex', '-1')
        } else {
            el.removeAttribute('tabindex')
        }
    })
}
