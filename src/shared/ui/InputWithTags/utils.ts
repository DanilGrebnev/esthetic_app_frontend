/**
 * Check on valid users tag write
 * @param string - текст тега
 */
export const isValidLabel = (string: string) => {
    return string.length >= 3
}

export const setInitialTags = <T extends { length: number } | undefined>(
    initialValue: T,
) => {
    return !initialValue?.length || !initialValue ? [] : initialValue
}

export const createTag = (label: string) => {
    return { tagId: Date.now().toString(), label: label.trim() }
}
