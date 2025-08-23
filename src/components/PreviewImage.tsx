import { useState } from "react";

const ReviewImages = ({ images }: { images: string[] }) => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  return (
    <>
      <div className="flex gap-2 mt-2 flex-wrap">
        {images?.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            onClick={() => setPreviewSrc(src)}
            className="w-20 h-20 object-cover rounded-md cursor-pointer hover:scale-105 transition"
          />
        ))}
      </div>

      {previewSrc && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setPreviewSrc(null)}
        >
          <img
            src={previewSrc}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-xl"
          />
        </div>
      )}
    </>
  );
};

export default ReviewImages;
