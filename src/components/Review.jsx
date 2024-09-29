import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegCommentDots, FaPaperPlane, FaEdit, FaTrash } from "react-icons/fa";
import { postReview, deleteReview, editReview } from "../config/AxiosInstance";

const Review = ({ review, refreshReviews }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(review.content);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  // Handle reply input change
  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  // Handle new reply submission
  const handleSubmitReply = async () => {
    try {
      const { data } = await postReview({
        bookId: review.bookId,
        content: newReply,
        parentReviewId: review._id,
      });
      if (data?.data) {
        toast.success(data?.message);
        refreshReviews(); // Refresh the reviews to show new reply
      } else {
        toast.error("Failed to add reply");
      }
    } catch (error) {
      toast.error("Error adding reply");
    } finally {
      setNewReply("");
      setShowInput(false);
    }
  };

  const handleDelete = async () => {
    console.log(review._id)
    try {
      const confirmDelete = confirm("Are you sure you want to delete this review ? ")
      if (!confirmDelete) return
      const { data } = await deleteReview(review._id);

      if (data?.success) {
        toast.success("Review deleted successfully");
        refreshReviews();
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      toast.error("Error deleting review");
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await editReview({ reviewId: review._id, content: updatedContent });
      if (data?.success) {
        toast.success("Review updated successfully");
        setEditing(false);
        refreshReviews();
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      toast.error("Error updating review");
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-4 shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex">
          <img
            src={review.userId.avatar}
            alt={review.userId.username}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-semibold text-gray-800">{review.userId.username}</div>
            {editing ? (
              <input
                type="text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            ) : (
              <div className="text-gray-600">{review.content}</div>
            )}
            <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="text-gray-600 hover:text-blue-600"
            onClick={() => setEditing(!editing)}
          >
            <FaEdit />
          </button>
          <button className="text-gray-600 hover:text-red-600" onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Save or Cancel edit options */}
      {editing && (
        <div className="mt-2 flex space-x-2">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Replies toggle button */}
      {review.replies && review.replies.length > 0 && (
        <button
          className="text-blue-600 hover:text-blue-800 focus:outline-none mt-2"
          onClick={toggleReplies}
        >
          {showReplies ? (
            <span>&#x25B2; View Less</span>
          ) : (
            <span>&#x25BC; View Replies ({review.replies.length})</span>
          )}
        </button>
      )}

      {/* Nested replies */}
      {showReplies && review.replies.length > 0 && (
        <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
          {review.replies.map((reply) => (
            <Review key={reply._id} review={reply} refreshReviews={refreshReviews} />
          ))}
        </div>
      )}

      {/* Add reply input */}
      <div className="mt-2">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
          onClick={() => setShowInput(!showInput)}
        >
          <FaRegCommentDots className="mr-1" />
          Add a Reply
        </button>
      </div>

      {/* Reply input field */}
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
