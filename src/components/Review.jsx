import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaRegCommentDots,
  FaPaperPlane,
  FaEdit,
  FaTrash,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { postReview, getNestedReviews } from "../config/AxiosInstance";
import { useSelector } from "react-redux";

const Review = ({ reviews }) => {
  const [expandedReviews, setExpandedReviews] = useState({});
  const [newReplyContent, setNewReplyContent] = useState("");
  const { userData } = useSelector((state) => state.user);

  const toggleReplies = async (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));

    // Fetch nested reviews on the first click
    if (!expandedReviews[reviewId]) {
      await fetchNestedReview(reviewId);
    }
  };

  const handleReplyChange = (e) => {
    setNewReplyContent(e.target.value);
  };

  const handleSubmitReply = async (parentReviewId) => {
    if (newReplyContent.trim() === "") return;

    try {
      const { data } = await postReview({
        bookId: "yourBookIdHere", // Replace with actual bookId
        content: newReplyContent,
        parentReviewId,
      });
      if (data?.data) {
        toast.success(data?.message);
        setNewReplyContent(""); // Clear input after posting
      } else {
        toast.error("Failed to add reply");
      }
    } catch (error) {
      toast.error("Error adding reply");
    }
  };

  const fetchNestedReview = async (reviewId) => {
    try {
      const { data } = await getNestedReviews(reviewId);
      // Update the review with the fetched nested replies
      setExpandedReviews((prev) => ({
        ...prev,
        [reviewId]: {
          ...(prev[reviewId] || {}),
          replies: data?.data || [],
        },
      }));
    } catch (error) {
      toast.error("Error fetching replies");
    }
  };

  return (
    <div>
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white border border-gray-300 rounded-lg p-3 mb-3 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div className="flex">
              <img
                src={review.userId.avatar}
                alt={review.userId.username}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {review.userId.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  {review?.replies?.length > 0 && (
                    <button
                      className="text-gray-500 hover:text-blue-500 text-base"
                      onClick={() => toggleReplies(review._id)}
                    >
                      {expandedReviews[review._id] ? <FaMinus /> : <FaPlus />}
                    </button>
                  )}
                </div>
                <div className="text-base text-gray-600">{review.content}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {userData?._id === review.userId._id && (
                <>
                  <button className="text-gray-500 hover:text-blue-500 text-base">
                    <FaEdit />
                  </button>
                  <button className="text-gray-500 hover:text-red-500 text-base">
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>

          {expandedReviews[review._id] && review.replies.length > 0 && (
            <div className="ml-4 mt-3 border-l-2 border-gray-200 pl-3">
              {review.replies.map((reply) => (
                <Review key={reply._id} reviews={[reply]} />
              ))}
            </div>
          )}

          <div className="mt-3">
            <label
              className="flex items-center text-sm text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer"
              onClick={() => toggleReplies(review._id)}
            >
              <FaRegCommentDots className="mr-1" />
              Reply
            </label>
          </div>

          {expandedReviews[review._id] && (
            <div className="mt-2 flex">
              <input
                type="text"
                value={newReplyContent}
                onChange={handleReplyChange}
                placeholder="Write a reply..."
                className="flex-1 p-2 text-sm border border-gray-300 rounded focus:outline-none"
              />
              <button
                onClick={() => handleSubmitReply(review._id)}
                className="ml-2 bg-blue-500 text-white px-3 py-2 rounded text-xs hover:bg-blue-600"
              >
                <FaPaperPlane />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Review;
