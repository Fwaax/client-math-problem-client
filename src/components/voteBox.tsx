import { useState } from "react";
import ArrowUpTransparentSvg from "../svg/arrowUpTransparentSvg";
import ArrowDownTransparentSvg from "../svg/arrowDownTransparentSvg";
import ArrowUpColoredSvg from "../svg/arrowUpColoredSvg";
import ArrowDownColoredSvg from "../svg/arrowDownColored";
import axios from "axios";
import { useJwtToken } from "../hooks/useJwtToken";

function VoteBox(props: {
    upvotes: number;
    downvotes: number;
    isUserUpVoted: boolean;
    isUserDownvoted: boolean;
    postId: string;
}) {
    const token = useJwtToken();
    const { upvotes, downvotes, isUserUpVoted, isUserDownvoted, postId } = props;

    const [vote, setVote] = useState<"up" | "down" | null>(
        isUserUpVoted ? "up" : isUserDownvoted ? "down" : null
    );
    const [upvoteCount, setUpvoteCount] = useState(upvotes);
    const [downvoteCount, setDownvoteCount] = useState(downvotes);
    const [error, setError] = useState<string | null>(null);

    const handleVote = async (direction: "up" | "down") => {
        if (!token) {
            setError("You must be logged in to vote.");
            return;
        }

        const isUpvote = direction === "up";

        // If already voted in that direction, treat it as toggling off
        const isSameVote = vote === direction;

        try {
            await axios.post(
                `/api/vote${postId}`,
                { isUpvote: !isSameVote ? isUpvote : !isUpvote }, // send the new intended value
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update vote state and counts
            if (isSameVote) {
                // Removing vote
                setVote(null);
                if (isUpvote) setUpvoteCount((prev) => prev - 1);
                else setDownvoteCount((prev) => prev - 1);
            } else {
                // Switching or casting new vote
                if (vote === "up") setUpvoteCount((prev) => prev - 1);
                if (vote === "down") setDownvoteCount((prev) => prev - 1);

                if (isUpvote) setUpvoteCount((prev) => prev + 1);
                else setDownvoteCount((prev) => prev + 1);

                setVote(direction);
            }

            setError(null);
        } catch (err) {
            setError("Failed to cast vote. Please try again.");
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 p-4 border rounded-lg w-fit">
            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleVote("up")}
            >
                {vote === "up" ? <ArrowUpColoredSvg width="24" height="24" /> : <ArrowUpTransparentSvg width="24" height="24" />}
                <span className={vote === "up" ? "text-green-500 font-semibold" : "text-gray-500"}>
                    {upvoteCount}
                </span>
            </div>

            <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleVote("down")}
            >
                {vote === "down" ? <ArrowDownColoredSvg width="24" height="24" /> : <ArrowDownTransparentSvg width="24" height="24" />}
                <span className={vote === "down" ? "text-red-500 font-semibold" : "text-gray-500"}>
                    {downvoteCount}
                </span>
            </div>

            {vote === "up" && <div className="text-green-500 ml-4">You upvoted</div>}
            {vote === "down" && <div className="text-red-500 ml-4">You downvoted</div>}
            {error && <div className="text-red-500 mt-2 sm:ml-4">{error}</div>}
        </div>
    );
}

export default VoteBox;
