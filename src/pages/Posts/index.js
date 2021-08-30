import { useEffect, useState } from "react";
import Button from "../../components/Button";
import PostCard from "../../components/PostCard";
import UserCard from "../../components/UserCard";
import { useAuth } from "../../contexts/auth.context";
import { getPosts } from '../../services/posts.service';
import './index.css';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { doLogout } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let id = params.get('user_id');

        async function fetchPosts() {
            try {
                const response = await getPosts(1);
                if (response) {
                    const { data } = response;
                    if (data && data.data && data.data.posts && data.data.posts.length) {
                        const sortedPosts = transformPosts(data.data.posts);
                        setPosts(sortedPosts);
                        let currentUserId = id ? id : sortedPosts[0].from_id;
                        setCurrentUser(currentUserId);
                        let currentUserPosts = sortedPosts.find(p => p.from_id === currentUserId);
                        setCurrentPosts(currentUserPosts.posts);
                        setUsers(sortedPosts.map(p => { return { id: p.from_id, name: p.from_name, posts_count: p.posts.length } }));
                        setLoading(false)
                    }
                }
            } catch (error) {
                if (/500/.test(error)) {
                    doLogout()
                }
            }
        }

        const transformPosts = (posts) => {
            let newPostsObjectArray = [];
            posts.forEach((post) => {
                const index = newPostsObjectArray.findIndex(p => p.from_id === post.from_id);
                if (index !== -1) {
                    newPostsObjectArray[index].posts.push({
                        id: post.id,
                        message: post.message,
                        created_time: post.created_time
                    })
                } else {
                    newPostsObjectArray.push({
                        from_name: post.from_name,
                        from_id: post.from_id,
                        posts: [{
                            id: post.id,
                            message: post.message,
                            created_time: post.created_time
                        }]
                    })
                }
            })
            newPostsObjectArray.sort(sortName)

            return newPostsObjectArray;
        }

        const sortName = (a, b) => {
            if (a.from_name < b.from_name) {
                return -1;
            }
            if (a.from_name > b.from_name) {
                return 1;
            }
            return 0;
        }
        fetchPosts();

    }, [doLogout])

    const sortPostsByDateAsc = () => {
        let postsToSort = [...currentPosts]
        const sortedPosts = postsToSort.sort((a, b) => new Date(a.created_time) - new Date(b.created_time));
        setCurrentPosts(sortedPosts)
    }

    const sortPostsByDateDesc = () => {
        let postsToSort = [...currentPosts]
        const sortedPosts = postsToSort.sort((a, b) => new Date(b.created_time) - new Date(a.created_time));
        setCurrentPosts(sortedPosts)
    }

    const handleUserCardClick = (from_id) => {
        setCurrentUser(from_id);
        setCurrentPosts(posts.find(p => p.from_id === from_id).posts)
    }

    const handlePostSearch = (query) => {
        const pattern = new RegExp(query, 'i');
        const currentUserPosts = posts.find(p => p.from_id === currentUser).posts;
        const filteredPosts = currentUserPosts.filter(p => pattern.test(p.message));
        setCurrentPosts(filteredPosts);
    }

    const handleUserSearch = (query) => {
        const usersToQuery = posts.map(p => { return { id: p.from_id, name: p.from_name, posts_count: p.posts.length } });
        const pattern = new RegExp(query, 'i');
        let usersFiltered = usersToQuery.filter(u => pattern.test(u.name))
        setUsers(usersFiltered);
    }

    return (
        <div className={`posts-page ${loading ? 'loading' : ''}`}>
            {!loading ?
                <div className='container'>
                    <section className="user-row">
                        <div className="user-search">
                            <input type="search" placeholder="filter users" onChange={(e) => handleUserSearch(e.target.value)} />
                        </div>
                        {
                            users && users.length ? users.map(u => {
                                return <UserCard
                                    key={`user-card-${u.id}`}
                                    id={u.id}
                                    name={u.name}
                                    postsCount={u.posts_count}
                                    handleUserCardClick={() => handleUserCardClick(u.id)}
                                    active={currentUser === u.id}
                                />
                            }) :
                                <div className="empty-feedback">No users to show</div>
                        }
                    </section>
                    <section className="posts-row">
                        <div className="filters">
                            <div className="sort-date">
                                <Button
                                    image={{
                                        src: '/assets/images/down-arrow.png',
                                        alt: 'Sort post dates by descending order'
                                    }}
                                    onClick={sortPostsByDateDesc}
                                />
                                <Button
                                    image={{
                                        src: '/assets/images/down-arrow.png',
                                        alt: 'Sort post dates by ascending order'
                                    }}
                                    classess='rotate-up ml-1'
                                    onClick={sortPostsByDateAsc}
                                />
                            </div>
                            <div className="filter-post">
                                <input type="search" placeholder="filter posts" onChange={(e) => handlePostSearch(e.target.value)} />
                            </div>
                        </div>
                        {
                            currentPosts &&
                                currentPosts.length ?
                                currentPosts.map((post) => {
                                    return <PostCard post={post} key={`post-card-${post.id}`} />
                                }) :
                                <div className="empty-feedback">No Posts to show</div>
                        }
                    </section>
                </div>
                :
                <img src='/assets/images/loading.gif' alt="Loading Page" />
            }
        </div>
    )
}

export default Posts;