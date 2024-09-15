export type ArgsWithSignal<T extends Record<string, any>> = T & {
    signal: AbortSignal
}
