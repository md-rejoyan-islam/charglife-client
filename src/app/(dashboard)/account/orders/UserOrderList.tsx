"use client";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { config } from "@/config";
import ClientSecureWrapper from "@/components/hoc/ClientSecureWrapper";
import { selectedUserToken } from "@/redux/slice/authSlice";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "lucide-react";

type TShippingAddress = {
  name: string;
  phone: string;
  address: string;
};

type TOrderItem = {
  product: { _id: string; productName: string };
  quantity: number;
  _id: string;
};

type TOrderRes = {
  _id: string;
  orderId: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  shippingAddress: TShippingAddress;
  items: TOrderItem[];
};

const StarRatingsComponent = StarRatings as unknown as React.FC<any>;

export default function UserOrderList() {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const token = useAppSelector(selectedUserToken);
  const router=useRouter()
  if (!userId) {
    router.push("/account/login");
  }

  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<{ id: string; name: string } | null>(null);
  const [reviewData, setReviewData] = useState<any>({ rating: 0, comment: "",image:null });

  useEffect(() => {
    setReviewData({ rating: 0, comment: "",image:null })
  }, [isModalOpen])

  const handleRemoveImage = (index:any) => {
    const updatedImages = reviewData?.image.filter((_:any, i:number) => i !== index);
    setReviewData({ ...reviewData, image: updatedImages });
};
const handleFileChange = (e:any) => {
  const files = Array.from(e.target.files);

  const updatedImages = files.map((file:any) => ({
      file,
      preview: URL.createObjectURL(file),
  }));

  setReviewData({
      ...reviewData,
      image: [...(reviewData.productImage || []), ...updatedImages],
  });
};

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${config.backend_url}/orders?userId=${userId}&page=${page}&isActive=true`
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setOrders(data.data.result || []);
          setTotalPages(data.data.totalPages || 1);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        setError("Something went wrong while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, page]);

  const handleReviewSubmit = async () => {
    if (!currentProduct) return;

    const payload = new FormData();
    payload.append("userId",userId??"")
    for (const key in reviewData) {

        if (key === "image" && Array.isArray(reviewData[key])) {
          reviewData[key].forEach((imgObj:any) => {
                if (imgObj.file) {
                    payload.append("image", imgObj.file);
                }
            });
        } else {
          if(key !== "image")
            payload.append(key, reviewData[key]);
        }
    }

    try {
      const response = await fetch(
        `${config.backend_url}/item/${currentProduct.id}/review`,
        {
          method: "PUT",
          headers: {

            Authorization: `Bearer ${token}`,
          },
          body:payload ,
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Review submitted successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to submit review.");
      }
    } catch (err) {
      alert("Something went wrong while submitting the review.");
    }
  };

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
          <ClientSecureWrapper>
      <div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-sm font-medium">S/No</th>
                <th className="py-3 px-4 text-sm font-medium">Order ID</th>
                <th className="py-3 px-4 text-sm font-medium">Total</th>
                <th className="py-3 px-4 text-sm font-medium">Subtotal</th>
                <th className="py-3 px-4 text-sm font-medium">Date</th>
                <th className="py-3 px-4 text-sm font-medium">Shipping Address</th>
              <th className="py-3 px-4 text-sm font-medium">Payment</th>
              <th className="py-3 px-4 text-sm font-medium">Status</th>
                <th className="py-3 px-4 text-sm font-medium">Items</th>
                {/* <th className="py-3 px-4 text-sm font-medium">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-white hover:bg-gray-100 border-t transition-all duration-200"
                >
                  <td className="py-3 px-4 text-sm text-gray-600 font-semibold">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-600 font-semibold">
                    #{order.orderId}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">৳{order.totalAmount}</td>
                  <td className="py-3 px-4 text-sm font-medium">৳{order.finalAmount}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.createdAt.split("T")[0]}
                  </td>
                  
                  <td className="py-3 px-4 text-sm">
                  {order.shippingAddress.name}, {order.shippingAddress.address} (
                  {order.shippingAddress.phone})
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  <span
                    className={`px-2 py-1 rounded-md text-xs bg-green-100 text-green-800`}
                  >
                    {order.paymentMethod.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                        <span
              className={`px-2 py-1 rounded-md text-xs ${
                order.paymentStatus.toLowerCase() === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
            }`}
                  >    {order.paymentStatus}</span>
              
                </td>

                  <td className="py-3 px-4 text-sm">
                    <ul className="list-disc list-inside">
                      {order.items.map((item:any) => (
                        <li key={item._id}>
                          {item?.product?.productName} (x{item?.quantity}){" "}
                          <button
                            className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-md"
                            onClick={() => {
                              setCurrentProduct({
                                id: item.product._id,
                                name: item.product.productName,
                              });
                              setIsModalOpen(true);
                            }}
                          >
                            Review
                          </button>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <button
              className={`px-4 py-2 text-white bg-blue-500 rounded-md ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm font-medium">{`Page ${page} of ${totalPages}`}</span>
            <button
              className={`px-4 py-2 text-white bg-blue-500 rounded-md ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </ClientSecureWrapper>
              {/* Review Modal */}
      {isModalOpen && (
        
         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
           <h2 className="text-lg font-bold mb-4">
             Review: {currentProduct?.name}
           </h2>
   
           {/* Star Rating System */}
           <div className="mb-4">
             <label className="block text-sm font-medium mb-2">Rating:</label>
                <div className="flex space-x-2">
                <StarRatingsComponent
                    rating={reviewData.rating}
          starRatedColor="yellow"
                    starHoverColor="yellow"
          changeRating={(e:any) =>
            setReviewData({ ...reviewData, rating:e  })
          }
          numberOfStars={5}
          name='rating'
        />
             </div>
           </div>
   
           {/* Comment Input */}
           <div className="mb-4">
             <label className="block text-sm font-medium mb-2">Comment:</label>
             <textarea
               value={reviewData.comment}
               onChange={(e) =>
                 setReviewData({ ...reviewData, comment: e.target.value })
               }
               className="w-full px-4 py-2 border rounded-md"
               rows={4}
             ></textarea>
            </div>
            
   
                                        <div>
                                            <div>
                                                <p >
                                                    Review Images
                                                </p>
                                                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                            </div>
                                            <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
                                                {reviewData.image &&
                                                    reviewData.image.map((img:any, index:number) => (
                                                        <div
                                                            key={index}
                                                            style={{position:"relative"  ,width:"100px",
                                                              height:"100px",  border:"1px solid #ddd",
                                                              borderRadius:"4px",
                                                              overflow:"hidden"}}

                                                          
                                                        >
                                                            <img
                                                                src={img.preview || img}
                                                                alt={`uploaded-${index}`}
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                            />
                                                            <button
                                                             
                                                                onClick={() => handleRemoveImage(index)}
                                                                style={{
                                                                  position: "absolute",
                                                                  borderRadius:"50%",
                                                                    top: 4,
                                                                    right: 4,
                                                                    color: "white",
                                                                }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </button>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                             
   
           {/* Action Buttons */}
           <div className="flex justify-end space-x-4">
             <button
               className="px-4 py-2 bg-gray-300 rounded-md"
               onClick={() => setIsModalOpen(false)}
             >
               Cancel
             </button>
             <button
               className="px-4 py-2 bg-blue-500 text-white rounded-md"
               onClick={handleReviewSubmit}
             >
               Submit
             </button>
           </div>
         </div>
       </div>
        )}
    </div>

  );
}
