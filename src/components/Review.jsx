import { useState } from "react";
import { FaRegCommentDots, FaPaperPlane } from "react-icons/fa";

const Review = ({ review }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newReply, setNewReply] = useState("");

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleSubmitReply = () => {
    console.log("New reply submitted:", newReply);
    setNewReply("");
    setShowInput(false);
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-4 shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-semibold text-gray-800">{review.userId}</div>
          <div className="text-gray-600">{review.content}</div>
          <div className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleString()}
          </div>
        </div>
        {review.replies && review.replies.length > 0 && (
          <button
            className="text-blue-600 hover:text-blue-800 focus:outline-none"
            onClick={toggleReplies}
          >
            {showReplies ? (
              <span>&#x25B2; View Less</span>
            ) : (
              <span>&#x25BC; View Replies ({review.replies.length})</span>
            )}
          </button>
        )}
      </div>

      {showReplies && review.replies.length > 0 && (
        <div className="ml-4 mt-2 border-t pt-2">
          {review.replies.map((reply) => (
            <Review key={reply._id} review={reply} />
          ))}
        </div>
      )}

      <div className="mt-2">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
          onClick={() => setShowInput(!showInput)}
        >
          <FaRegCommentDots className="mr-1" />
          Add a Reply
        </button>
      </div>

      {showInput && (
        <div className="mt-2 flex">
          <input
            type="text"
            value={newReply}
            onChange={handleReplyChange}
            placeholder="Write a reply..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleSubmitReply}
            className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            <FaPaperPlane />
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
