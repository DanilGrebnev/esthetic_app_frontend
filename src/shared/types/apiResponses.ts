interface CreateResponseType<M extends string, S extends number> {
    message: M
    status: S
}

export type SuccessResponse = CreateResponseType<'ok', 200>
export type NotAuth = CreateResponseType<'Not authorized', 401>
export type NotFound = CreateResponseType<'Not found', 404>
