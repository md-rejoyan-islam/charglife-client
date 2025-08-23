import { config } from "@/config";
import { useAppSelector } from "@/redux/hooks";
import { selectedUserToken } from "@/redux/slice/authSlice";
import { useState } from "react";
import { toast } from "sonner";

const ProductFAQ = ({ product }: { product: any }) => {
  const [question, setQuestion] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [faqList, setFaqList] = useState(
    product?.faq.sort(
      (a: any, b: any) =>
        new Date(b.time).getTime() - new Date(a.time).getTime()
    ) || []
  );
  const [showAllFAQs, setShowAllFAQs] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const token = useAppSelector(selectedUserToken);

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;

    try {
      setSubmitting(true);
      const response = await fetch(
        `${config.backend_url}/item/${product._id}/faq`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            time: new Date(),
            question,
            userId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Question submitted successfully!");
        setQuestion("");
        setShowInput(false);

        // Refetch updated product FAQ list
        const res = await fetch(`${config.backend_url}/item/${product._id}`, {
          cache: "no-store",
        });
        const updatedProduct = await res.json();
        setFaqList(
          (updatedProduct?.data?.faq || []).sort(
            (a: any, b: any) =>
              new Date(b.time).getTime() - new Date(a.time).getTime()
          )
        );
      } else {
        toast.error(data.message || "Failed to submit question.");
      }
    } catch (err) {
      toast.error("Something went wrong while submitting the question.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const displayedFAQs = showAllFAQs ? faqList : faqList.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-2xl font-semibold">
          Questions {faqList?.length > 0 && `(${faqList.length})`}
        </h3>
        <button
          onClick={() =>
            userId
              ? setShowInput(!showInput)
              : toast.error("Login First to ask a question")
          }
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          Ask a Question
        </button>
      </div>
      <p className="mb-5">
        Have question about this product? Get specific details about this
        product from expert.
      </p>

      {showInput && (
        <div className="mb-6">
          <textarea
            className="w-full border rounded-lg p-3 mb-2"
            rows={3}
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={handleQuestionSubmit}
            disabled={submitting}
            className="bg-[#100f11] text-white px-4 py-2 rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}

      {faqList.length > 0 ? (
        <div className="space-y-6">
          {displayedFAQs.map((ques: any) => {
            const name = ques?.userId?.name ?? ques?.name ?? "Anonymous";
            const date = new Date(ques?.time).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={ques._id}
                className="p-3 border-b rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-7 h-7 bg-gray-200 rounded-full overflow-hidden">
                    {ques?.userId?.avatar ? (
                      <img
                        src={ques.userId.avatar}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-[#FAD70F] text-sm font-semibold">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#FAD70F] text-sm">
                      {name}
                    </p>
                    <p className="text-sm text-[#A6A6A8]">on {date}</p>
                  </div>
                </div>

                <div className="ml-1">
                  <p className="font-bold text-gray-800 mb-1">
                    Q:{" "}
                    <span className="font-semibold text-gray-700">
                      {ques?.question}
                    </span>
                  </p>
                  {ques?.answer && (
                    <p className="font-bold text-gray-800">
                      A:{" "}
                      <span className="font-normal text-gray-700">
                        {ques?.answer}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {faqList.length > 3 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAllFAQs(!showAllFAQs)}
                className="text-blue-600 hover:underline font-medium"
              >
                {showAllFAQs ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-10">
          No question yet. Be the first to question!
        </p>
      )}
    </div>
  );
};

export default ProductFAQ;
