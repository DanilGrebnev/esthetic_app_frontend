export const readFile = (file?: File) =>
    new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader()

        if (!file) {
            return reject('Error: file not found')
        }

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            resolve(reader.result)
        }

        reader.onerror = () => {
            reject('Error load data')
        }
    })
