import { TagsItem } from '../TagsItem'
import s from './s.module.scss'

export const DropDown = () => {
    const a = [
        'security',
        'complication',
        'leak',
        'scratch',
        'pony',
        'sphere',
        'summary',
        'sum',
        'healthy',
        'toast',
        'aspect',
        'tiptoe',
        'indulge',
        'minister',
        'tin',
        'rear',
        'biography',
        'tank',
        'pour',
        'consumer',
    ]
    return (
        <div className={s.dropdown}>
            {a.map((w) => (
                <TagsItem
                    key={w}
                    tag={w}
                />
            ))}
        </div>
    )
}
