/**
 * Функция для скачивания файлов
 * @param url - путь до файла
 * @param name - название файла
 */
export const downloadFileByURL = async (
    url: string,
    name: string,
): Promise<void> => {
    const downloadLinkId = 'download-link'

    const blob = await fetch(url).then((response) => response.blob())

    const link = document.createElement('a')
    link.download = name ?? ''
    link.hidden = true
    link.href = URL.createObjectURL(blob)
    link.id = downloadLinkId

    document.body?.append(link)

    link.click()

    const downloadLink = document.getElementById(downloadLinkId) as HTMLElement

    downloadLink?.remove()
}
