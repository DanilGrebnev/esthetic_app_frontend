import { useEffect } from 'react'
import toast from 'react-hot-toast'

/**
 * Показывает всплывающее окно при ошибке или успешном ответе
 */
export const useShowToast = (isSuccess: boolean, isError: boolean) => {
    useEffect(() => {
        if (isSuccess) {
            toast.success('Код отправлен на почту')
            return
        }
        if (isError) {
            toast.error('Ошибка регистрации')
        }
    }, [isSuccess, isError])
}
