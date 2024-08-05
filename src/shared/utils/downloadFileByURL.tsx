/**
 * Функция для скачивания файлов
 * @param url - путь до файла
 * @param name - название файла
 */
export const downloadFileByURL = (url: string, name: string): void => {
    const a = document.createElement('a')
    a.setAttribute('download', name)
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('id', 'download')
    document.body.append(a)
    const downloadLink = document.getElementById('download') as HTMLElement
    downloadLink?.click()
    downloadLink?.remove()
}
