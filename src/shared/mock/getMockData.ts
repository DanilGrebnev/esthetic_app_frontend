type TData = { postsAmount: number; posts: { id: number; name: string }[] }

export const getMockData = async (args: {
    offset: number
    limit: number
}): Promise<TData> => {
    const data = await import('./MOCK_DATA.json')
    console.log('Данные загружаются')

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                postsAmount: data.default.length,
                posts: data.default.slice(args?.offset, args?.limit),
            })
            console.log('Данные загружены')
        }, 2000)
    })
}
