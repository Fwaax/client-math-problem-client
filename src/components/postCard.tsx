// components/PostCard.tsx
import VoteBox from './voteBox';

export interface EnrichedPost {
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

const PostCard = ({ post }: { post: EnrichedPost }) => (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white space-y-3">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-sm text-gray-500">
            Posted by <span className="font-medium">{post.uploader}</span> on{' '}
            {new Date(post.date).toLocaleString()}
        </p>
        <p className="text-base">{post.content}</p>
        <p className="text-sm text-blue-500">#{post.tag}</p>
        <VoteBox
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            isUserUpVoted={post.userVote === true}
            isUserDownvoted={post.userVote === false}
            postId={post._id}
        />
    </div>
);

export default PostCard;
