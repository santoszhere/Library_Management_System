import { useEffect, useState } from "react";
import { fetchReview } from "../config/AxiosInstance";
import Review from "./Review";

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

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
  }, [bookId]);

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
    </div>
  );
};

export default ReviewList;
