// pages/PostPage.tsx
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useJwtToken } from '../hooks/useJwtToken';
import PostCard from '../components/postCard';

interface EnrichedPost {
    _id: string;
    title: string;
    content: string;
    uploader: string;
    date: string;
    tag: string;
    upvotes: number;
    downvotes: number;
    userVote: boolean | null;
}

const PostPage = () => {
    const { postId } = useParams({ from: '/posts/$postId' });
    const { token } = useJwtToken();

    const {
        data: postData = null,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['postData', postId, token],
        enabled: !!token,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:7821/post/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data.data;
        },
    });

    if (isLoading) return <div className="p-4">Loading post...</div>;
    if (isError || !postData) return <div className="p-4 text-red-500">Failed to load post.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 mt-6">
            <PostCard post={postData} />
        </div>
    );
};

export default PostPage;
