import React, { useEffect, useState } from 'react'
import { useJwtToken } from '../hooks/useJwtToken';
import PostCard, { EnrichedPost } from '../components/postCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


interface PostsResponse {
    page: number;
    limit: number;
    posts: EnrichedPost[];
    totalCount: number;
}

interface DataContainedInToken {
    id: string;
}

const SpecificUserPage = () => {
    const { token } = useJwtToken();
    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState<EnrichedPost[]>([]);
    const [hasMore, setHasMore] = useState(true);


    function getUserIdFromToken(): string | null {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const base64Payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(base64Payload)) as DataContainedInToken;

            return decodedPayload.id;
        } catch (error) {
            console.error('Invalid token', error);
            return null;
        }
    }

    const userId = getUserIdFromToken();

    useEffect(() => {
        if (userId) {
            console.log('Logged-in user ID:', userId);
        }
    }, [userId]);

    if (!userId) throw new Error('User ID is missing');

    const { data: latestUserPosts, isPending, isError } = useQuery<PostsResponse>({
        queryKey: ['userPosts', page, token],
        enabled: !!token,
        placeholderData: { page: 0, limit: 0, posts: [], totalCount: 0 },
        staleTime: 0,
        gcTime: 0,
        queryFn: async () => {
            const limit = 10;
            const response = await axios.get(`http://localhost:7821/post/posts/${userId}?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('response.data.data', response.data.data);

            return response.data.data as PostsResponse;
        },
    });

    useEffect(() => {
        if (latestUserPosts?.posts) {
            setAllPosts(prevPosts => [...prevPosts, ...latestUserPosts.posts]);
            setHasMore(latestUserPosts.posts.length > 0);
        }
    }, [latestUserPosts]);

    const loadMorePosts = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    console.log('allposts', allPosts);


    if (isPending && page === 1) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts</div>;
    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                {allPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
            {hasMore ? (
                <div className="mt-4 text-center">
                    <button
                        onClick={loadMorePosts}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                        disabled={isPending}
                    >
                        {isPending ? 'Loading...' : 'Show more'}
                    </button>
                </div>
            ) : (
                <div className="mt-4 text-center text-gray-500">
                    No more posts to show
                </div>
            )}
        </div>
    )
}

export default SpecificUserPage
