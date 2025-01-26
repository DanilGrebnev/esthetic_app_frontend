export const submitProfile =
    <TDefaultValue extends any>(
        defaultValues: TDefaultValue,
        mutate: (formData: FormData) => void,
    ) =>
    <TData extends any, TEvent extends { target: any }>(
        data: TData,
        e: TEvent,
    ) => {
        const formData = new FormData(e?.target as any)

        Object.entries(defaultValues as any).forEach(([defaultK, defaultV]) => {
            if (data[defaultK as keyof typeof data] === defaultV) {
                formData.delete(defaultK)
            }
        })

        if (!(formData.get('avatar') as File).size) {
            formData.delete('avatar')
        }
        mutate(formData)
    }
