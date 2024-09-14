/* Функция для создания базового объекта с ответом api */
export function createBaseResponse<M extends string, S extends number>(
    message: M,
    status: S,
) {
    return { message, status } as const
}

export type BaseResponseType = ReturnType<typeof createBaseResponse>

export type SuccessResponse = ReturnType<typeof createBaseResponse<'ok', 200>>

export type BadRequest = ReturnType<
    typeof createBaseResponse<'Bad request', 400>
>
export type NotAuth = ReturnType<typeof createBaseResponse<'Not found', 404>>
