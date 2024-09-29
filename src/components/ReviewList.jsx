import { useEffect, useState } from "react";
import { fetchReview, postReview, deleteReview, editReview } from "../config/AxiosInstance";
import Review from "./Review";
import { FaPaperPlane, FaRegCommentDots } from "react-icons/fa";
import toast from "react-hot-toast";

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleSubmitReply = async () => {
    try {
      const { data } = await postReview({ bookId, content: newReply, parentReviewId: null });
      if (data?.data) {
        toast.success("Review added successfully");
        setNewReply("");
        setShowInput(false);
        setRefresh(!refresh); // Trigger refresh to load new reviews
      } else {
        toast.error("Failed to add review");
      }
    } catch (error) {
      toast.error("Error adding review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const { data } = await deleteReview(reviewId);
      if (data?.success) {
        toast.success("Review deleted successfully");
        setRefresh(!refresh); // Trigger refresh after deletion
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      toast.error("Error deleting review");
    }
  };

  const handleEditReview = async (reviewId, updatedContent) => {
    try {
      const { data } = await editReview(reviewId, { content: updatedContent });
      if (data?.success) {
        toast.success("Review updated successfully");
        setRefresh(!refresh); // Trigger refresh after edit
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      toast.error("Error updating review");
    }
  };

  const getReviews = async () => {
    try {
      const { data } = await fetchReview(bookId);
      setReviews(data?.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Error loading reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [bookId, refresh]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review._id}
            review={review}
            refreshReviews={() => setRefresh(!refresh)}
            handleDeleteReview={handleDeleteReview}
            handleEditReview={handleEditReview}
          />
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {/* Add a new review */}
      <div className="mt-2">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
          onClick={() => setShowInput(!showInput)}
        >
          <FaRegCommentDots className="mr-1" />
          Add a Review
        </button>
      </div>

      {showInput && (
        <div className="mt-2 flex">
          <input
            type="text"
            value={newReply}
            onChange={handleReplyChange}
            placeholder="Write a review..."
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

export default ReviewList;
