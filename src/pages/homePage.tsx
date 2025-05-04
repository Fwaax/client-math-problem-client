import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useJwtToken } from '../hooks/useJwtToken';
import PostCard, { EnrichedPost } from '../components/postCard';

interface PostsResponse {
    page: number;
    limit: number;
    posts: EnrichedPost[];
    totalCount: number;
}

const HomePage = () => {
    const { token } = useJwtToken();
    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState<EnrichedPost[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { data: latestPostData, isPending, isError } = useQuery<PostsResponse>({
        queryKey: ['posts', page, token],
        enabled: !!token,
        placeholderData: { page: 0, limit: 0, posts: [], totalCount: 0 },
        staleTime: 0,
        gcTime: 0,
        queryFn: async () => {
            const limit = 10;
            const response = await axios.get(`http://localhost:7821/post/posts?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data as PostsResponse;
        },
    });

    useEffect(() => {
        if (latestPostData?.posts) {
            setAllPosts(prevPosts => [...prevPosts, ...latestPostData.posts]);
            setHasMore(latestPostData.posts.length > 0);
        }
    }, [latestPostData]);

    const loadMorePosts = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

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
    );
};

export default HomePage;