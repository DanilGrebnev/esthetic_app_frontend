'use client'

import CrossIcon from '@/shared/assets/cross.svg'
import { TagItem } from '@/shared/ui/InputWithTags/TagItem'
import { clsx } from 'clsx'
import {
    type ChangeEvent,
    type FC,
    type KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'

import s from './s.module.scss'

interface InputWithTagsProps {
    onChange?: (value: string[]) => void
}

export const InputWithTags: FC<InputWithTagsProps> = (props) => {
    const { onChange } = props
    const [value, setValue] = useState('')
    const [tags, setTags] = useState<{ tagId: string; label: string }[]>([])
    const [wrapperWidth, setWrapperWidth] = useState<number>(0)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setWrapperWidth(wrapperRef?.current?.offsetWidth as number)
    }, [])

    const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            const ev = e as unknown as ChangeEvent<HTMLInputElement>
            if (!ev.target.value.trim()) return
            setTags([
                {
                    tagId: Date.now().toString(),
                    label: ev.target.value,
                },
                ...tags,
            ])
            setValue('')
        }
    }

    useEffect(() => {
        onChange?.(tags.map((el) => el.label))
    }, [tags])

    const deleteTag = useCallback(
        (tagId: string) => {
            setTags(tags.filter((tag) => tag.tagId !== tagId))
        },
        [tags],
    )

    const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const value = target.value
        if (value.length === 30) return
        setValue(value)
    }

    return (
        <div
            ref={wrapperRef}
            style={wrapperWidth ? { maxWidth: wrapperWidth + 'px' } : undefined}
            className={clsx(s['input-wrapper'])}
        >
            <div className={s['tags-wrapper']}>
                {tags.map(({ tagId, label }) => {
                    return (
                        <TagItem
                            key={tagId}
                            tagId={tagId}
                            label={label}
                            deleteTag={deleteTag}
                        />
                    )
                })}
                <input
                    className={s.input}
                    value={value}
                    onKeyDown={addTag}
                    onChange={onChangeInput}
                    placeholder={!tags.length ? 'Введите теги' : undefined}
                />
            </div>
        </div>
    )
}
