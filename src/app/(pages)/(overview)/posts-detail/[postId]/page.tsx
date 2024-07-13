export default function DetailPosts({
    params: { postId },
}: {
    params: { postId: string }
}) {
    return <div>{postId}</div>
}
