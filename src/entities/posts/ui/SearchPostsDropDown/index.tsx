import { ActiveTags } from './ActiveTags/ActiveTags'
import { RecommendedTags } from './RecommendedTags'

interface DropDownProps {
    className?: string
}

export const SearchPostsDropDown = (props: DropDownProps) => {
    const { className } = props

    return (
        <div className={className}>
            <ActiveTags />
            <RecommendedTags />
        </div>
    )
}
