import { TSetting } from './types'

/* Принимает в себя настройки компонента и возвращает их в нужном виде */
export const getSetting = (setting?: TSetting) => {
    if (!setting) return
    const transition = setting?.transition
        ? setting.transition + 's'
        : undefined

    return { transition }
}
