/**
 * Check on valid users tag write
 * @param string - текст тега
 */
export const isValidTag = (string: string) => {
    return string.length >= 3
}

export const setInitialTagsState = <T extends { length: number } | undefined>(
    initialValue: T,
) => {
    return !initialValue?.length || !initialValue ? [] : initialValue
}
