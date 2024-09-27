import { useEffect, useState } from "react";
import { fetchReview, postReview } from "../config/AxiosInstance";
import Review from "./Review";
import { FaPaperPlane, FaRegCommentDots } from "react-icons/fa";
import toast from 'react-hot-toast'

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [showInput, setShowInput] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [refresh, setRefresh] = useState(false)


  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleSubmitReply = async () => {
    setNewReply("");
    setShowInput(false);

    const { data } = await postReview({ bookId, content: newReply, parentReviewId: null })
    if (data?.data) {
      toast.success(data?.message)
      setRefresh(!refresh)
    }
    if (!data?.data) {
      toast.error("Failed to add review")
    }
  };

  const getReview = async () => {
    try {
      const { data } = await fetchReview(bookId);
      setReviews(data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReview();
  }, [bookId, refresh]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => <Review key={review._id} review={review} />)
      ) : (
        <p>No reviews yet.</p>
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
      )
      }
    </div>
  );
};

export default ReviewList;
