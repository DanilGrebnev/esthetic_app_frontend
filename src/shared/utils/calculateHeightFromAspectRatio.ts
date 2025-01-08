export const calculateHeightFromAspectRatio = (aspect: string, w: number) => {
    const mathes = aspect.match(/([\d{0,2}])\/(\d{0,2})/)
    const a = Number(mathes?.[1])
    const b = Number(mathes?.[2])
    const height = +((w * b) / a).toFixed()
    return height
}
