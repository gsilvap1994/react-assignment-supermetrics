import './index.css';

const PostCard = ({ post }) => {

    const getFormattedDate = (date) => {
        let month = date.toLocaleString('default', { month: 'long' })
        return `${month} ${date.getDate()}, ${date.getFullYear()} ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
    }

    return (
        <div className="post-card">
            <div className="header">
                {post && post.created_time && getFormattedDate(new Date(post.created_time))}
            </div>
            <div className="body">
                {post && post.message}
            </div>
        </div>
    )
}

export default PostCard;