import './index.css';

const UserCard = ({ id, name, postsCount, handleUserCardClick, active }) => (
    <div id={id} className={`user-card ${active ? 'active' : ''}`} onClick={handleUserCardClick}>
        <div>{name}</div>
        <div className='count'>{postsCount}</div>
    </div>
)
export default UserCard