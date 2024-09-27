const Review = ({ review }) => {
  console.log(review, "REVIEW");
  return (
    <div className="bg-gray-100 border rounded p-4 mb-2">
      <div className="font-semibold">{review.userId}</div>
      <div>{review.content}</div>
      <div className="text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleString()}
      </div>

      {review.replies && review.replies.length > 0 && (
        <div className="ml-4 mt-2">
          {review.replies.map((reply) => (
            <Review key={reply._id} review={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
