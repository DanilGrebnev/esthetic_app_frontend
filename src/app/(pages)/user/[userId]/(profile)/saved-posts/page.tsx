import { DashboardList } from '@/entities/dashboard'

interface SavedPosts {
    params: {
        userId: string
    }
}

export default function SavedPosts(props: SavedPosts) {
    return <DashboardList userId={props.params.userId} />
}
