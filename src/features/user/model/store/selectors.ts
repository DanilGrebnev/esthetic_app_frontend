import { useUserStore } from './userSlice'

export const useSetPublicProfileSelector = () => {
    return useUserStore((s) => s.setPublicProfile)
}

/* Получение общедоступного профиля пользователя из хранилища */
export const useGetPublicProfileQuerySelector = () => {
    return useUserStore((s) => s.publicProfile)
}

/* Получение профиля пользователя из хранилища */
export const useGetPrivateProfileSelector = () => {
    return useUserStore((s) => s.privateProfile)
}

/* Установка данных профиля пользователя в хранилище */
export const useSetPrivateProfileSelector = () => {
    return useUserStore((s) => s.setPrivateProfile)
}
