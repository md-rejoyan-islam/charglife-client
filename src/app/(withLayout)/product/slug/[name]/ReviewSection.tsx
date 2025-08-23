import ReviewImages from '@/components/PreviewImage';
import React from 'react';
import StarRatings from "react-star-ratings";
import { Progress } from "@/components/Progress"

const StarRatingsComponent = StarRatings as unknown as React.FC<any>;

const ReviewSection = ({product}:{product:any}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-1">Reviews ({product.reviews.numberOfReviews})</h3>
        <p className="mb-8">Get specific details about this product from customers who own it.</p>

        <div className="mb-4 flex gap-5 justify-between flex-wrap border-b pb-7">
          <div>
          <h4 className="mb-3 font-semibold">Overall Rating</h4>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-3xl">{product?.ratings?.toFixed(1) ?? 0}</h2>
            <div>
            <StarRatingsComponent
          name="rating"
          numberOfStars={5}
          starSpacing="2px"
          rating={product?.ratings || 0}
          starRatedColor="orange"
          starDimension="10px"
              />
             <p className="text-[gray] text-xs"> ({product.reviews.numberOfReviews} reviews)</p>
            </div>
          </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Overall Rating</h4>
            {[5,4,3,2,1].map(
                    (rating, index) => (
                <div key={index} className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-yellow-500 mb-2">
                            <StarRatingsComponent
          name="rating"
          numberOfStars={5}
          starSpacing="2px"
          rating={rating || 0}
          starRatedColor="orange"
          starDimension="10px"
              />
            </div>
                        <div className="flex items-center gap-2 text-appBlue text-sm font-bold mb-1">
                          <Progress
                            value={product?.reviews?.userReview?.filter((res:any)=>res.rating==rating)?.length}
                            className="w-[200px] h-2 bg-[#a9a9a961]"
                          />
                          {product?.reviews?.userReview?.filter((res:any)=>res.rating==rating)?.length}
                        </div>
                      </div>
                    )
                  )}
          </div>
          <div>
          <h4 className="mb-3 font-semibold">Review this product</h4>
          <StarRatingsComponent
          name="rating"
          numberOfStars={5}
          starSpacing="5px"
          rating={5}
          starRatedColor="orange"
          starDimension="30px"
              />
    
           <p className="mt-3 text-[darkgray] text-sm"> Adding a review requires a order of the product.</p>
           <p className="text-[darkgray] text-sm">You can review from your order list.</p>
            
          </div>
        </div>

        {/* Display Number of Reviews */}
        {product?.reviews?.numberOfReviews > 0 ? (
          <div>
            {/* Render each user review */}
            <div className="space-y-3">
              {product.reviews.userReview.map((review: any) => (
                <div key={review._id} className="p-4 border-b rounded-lg bg-gray-50">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-1">
                    <div className="w-7 h-7 bg-gray-200 rounded-full overflow-hidden">
                      {review?.userId?.avatar ? (
                        <img
                          src={review.userId.avatar || "/placeholder.svg"}
                          alt={review.userId.name??review?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <span className="text-xl font-semibold">{(review?.userId?.name ?? review?.name).charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div ><span className="text-sm text-[#FAD70F] font-semibold">{review?.userId?.name??review?.name}</span> <span className="text-sm text-gray-200 text-[#A6A6A8]">on { new Date(review?.time).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}</span></div>
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-yellow-500 mb-2">
                        {Array.from({ length: review.rating }, (_, index) => (
                          <span key={index}>&#9733;</span> // Star icon (can replace with an actual icon component)
                        ))}
                      </div>
                      {/* <p className="text-sm text-gray-500">{review.userId.email}</p> */}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-sm">{review.comment}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                  <div className="flex gap-2 mt-2">
                      {review?.image &&
                <ReviewImages images={review?.image}/>}
            </div>  
                 </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div>
    );
};

export default ReviewSection;