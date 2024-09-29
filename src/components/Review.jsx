import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FaRegCommentDots, FaPaperPlane, FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { postReview, deleteReview, editReview } from "../config/AxiosInstance";
import { useSelector } from "react-redux";

const Review = ({ review, refreshReviews }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(review.content);
  const replyInputRef = useRef(null);
  const { userData } = useSelector(state => state.user)

  const isPostedUser = userData?._id === review?.userId._id
  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleSubmitReply = async () => {
    if (newReply.trim() === "") return;
    try {
      const { data } = await postReview({
        bookId: review.bookId,
        content: newReply,
        parentReviewId: review._id,
      });
      if (data?.data) {
        toast.success(data?.message);
        refreshReviews();
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
    try {
      const confirmDelete = confirm("Are you sure you want to delete this review?");
      if (!confirmDelete) return;
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmitReply();
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-3 mb-3 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex">
          <img
            src={review.userId.avatar}
            alt={review.userId.username}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-800">{review.userId.username}</span>
              <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>

              {review.replies && review.replies.length > 0 && (
                <button
                  className="text-gray-500 hover:text-blue-500 text-base"
                  onClick={toggleReplies}
                >
                  {showReplies ? <FaMinus /> : <FaPlus />}
                </button>
              )}
            </div>
            {editing ? (
              <input
                type="text"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none"
              />
            ) : (
              <div className="text-base text-gray-600">{review.content}</div> // Increased font size slightly
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">

          {isPostedUser &&
            <>
              <button
                className="text-gray-500 hover:text-blue-500 text-base"
                onClick={() => setEditing(!editing)}
              >
                <FaEdit />
              </button>
              <button className="text-gray-500 hover:text-red-500 text-base" onClick={handleDelete}>
                <FaTrash />
              </button>
            </>
          }
        </div>
      </div>

      {editing && (
        <div className="mt-2 flex space-x-2">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {showReplies && review.replies.length > 0 && (
        <div className="ml-4 mt-3 border-l-2 border-gray-200 pl-3"> {/* Add Reddit-like border */}
          {review.replies.map((reply) => (
            <Review key={reply._id} review={reply} refreshReviews={refreshReviews} />
          ))}
        </div>
      )}

      <div className="mt-3">
        <label
          htmlFor={`reply-input-${review._id}`}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer"
          onClick={() => {
            setShowInput(true);
            setTimeout(() => replyInputRef.current.focus(), 100);
          }}
        >
          <FaRegCommentDots className="mr-1" />
          Reply
        </label>
      </div>

      {showInput && (
        <div className="mt-2 flex">
          <input
            id={`reply-input-${review._id}`}
            ref={replyInputRef}
            type="text"
            value={newReply}
            onChange={handleReplyChange}
            onKeyDown={handleKeyDown}
            placeholder="Write a reply..."
            className="flex-1 p-2 text-sm border border-gray-300 rounded focus:outline-none"
          />
          <button
            onClick={handleSubmitReply}
            className="ml-2 bg-blue-500 text-white px-3 py-2 rounded text-xs hover:bg-blue-600"
          >
            <FaPaperPlane />
          </button>
        </div>
      )}
    </div>
  );
};

export default Review;
