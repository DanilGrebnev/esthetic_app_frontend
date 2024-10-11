type TData = { postsAmount: number; posts: { id: number; name: string }[] }

export const getMockData = async (args: {
    offset: number
    limit: number
}): Promise<TData> => {
    const data = await import('./MOCK_DATA.json')
    const updatedData = data.default.map((el, i) => ({ ...el, id: i + 1 }))

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                postsAmount: data.default.length,
                posts: updatedData.slice(args?.offset, args?.limit),
            })
        }, 2000)
    })
}
