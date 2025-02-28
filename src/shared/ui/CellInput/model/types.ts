export interface NumberInputProps {
    length: number
    onChange?: (value: string) => void
    className?: string
}

export interface TCells {
    position: number
    value: string
    focus: boolean
}
