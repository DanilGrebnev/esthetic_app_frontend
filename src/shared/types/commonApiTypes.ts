export type ArgsWithSignal<T extends Record<string, any> = {}> = {
    signal?: AbortSignal
} & T

export type ArgsWithEnabled<T extends Record<string, any> = {}> = {
    enabled?: boolean
} & T
