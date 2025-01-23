import { ActiveTags } from './ActiveTags/ActiveTags'
import { SearchTags } from './SearchTags'

interface DropDownProps {
    className?: string
}

export const SearchPostsDropDown = (props: DropDownProps) => {
    const { className } = props

    return (
        <div className={className}>
            <ActiveTags />
            <SearchTags />
        </div>
    )
}
