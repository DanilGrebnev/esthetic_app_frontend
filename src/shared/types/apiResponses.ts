/* Функция для создания базового объекта с ответом api */
import { createBaseResponse } from '../api/lib'

export type BaseResponseType = ReturnType<typeof createBaseResponse>

export type TErrorResponse = ReturnType<typeof createBaseResponse>

export const isErrorResponse = (data: any): data is TErrorResponse => {
    return 'message' in data && 'status' in data
}

export type SuccessResponse = ReturnType<typeof createBaseResponse<'ok', 200>>

export type BadRequest = ReturnType<
    typeof createBaseResponse<'Bad request', 400>
>
export type NotAuth = ReturnType<typeof createBaseResponse<'Not found', 404>>
