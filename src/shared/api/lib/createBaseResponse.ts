export function createBaseResponse<M extends string, S extends number>(
    message: M,
    status: S,
) {
    return { message, status } as const
}
