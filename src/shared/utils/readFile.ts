type FileReaderMethods = 'readAsArrayBuffer' | 'readAsDataURL' | 'readAsText'

export const readFile = (
    file?: File,
    options?: {
        method: FileReaderMethods
    },
) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const method = options?.method || 'readAsDataURL'
        const reader = new FileReader()

        if (!file) {
            return reject('Error: file not found')
        }

        reader[method](file)

        reader.onloadend = () => {
            resolve(reader.result)
        }

        reader.onerror = () => {
            reject('Error load data')
        }
    })
}
