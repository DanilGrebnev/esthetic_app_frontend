import { useLatest } from '@/shared/hooks/useLatest'
import {
    type ChangeEvent,
    type ComponentPropsWithRef,
    type KeyboardEvent,
    type MutableRefObject,
    forwardRef,
    useCallback,
    useState,
} from 'react'

import { AcceptBtn } from '../AcceptBtn'
import { type Tags } from '../types'
import s from './s.module.scss'

interface InputProps extends ComponentPropsWithRef<'input'> {
    setTags: (arg: Tags[]) => void
    tags: MutableRefObject<Tags[]>
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { placeholder, tags, setTags } = props

    const [value, setValue] = useState('')
    const latestValue = useLatest(value)

    const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const value = target.value
        if (value.length === 30) return
        setValue(value)
    }

    const addTag = useCallback(() => {
        setTags([
            {
                tagId: Date.now().toString(),
                label: latestValue.current,
            },
            ...tags.current,
        ])
        setValue('')
    }, [latestValue, setTags, tags])

    const addTagByClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTag()
        }
    }

    return (
        <div className={s['input-container']}>
            <input
                ref={ref}
                value={value}
                className={s.input}
                onChange={onChangeInput}
                placeholder={placeholder}
                onKeyDown={addTagByClickEnter}
            />
            {value && <AcceptBtn onClick={addTag} />}
        </div>
    )
})

Input.displayName = 'Input'
