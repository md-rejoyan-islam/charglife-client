type Props = {
  data: {
    name: string;
    image?: string;
    description?: string;
  };
};

const DynamicPage = ({ data }: Props) => {
  if (!data) {
    return (
      <div className="text-center text-red-500 py-10">
        No data found for this page.
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-10">
      {data?.image && (
        <div className="mb-6">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-auto shadow-md"
          />
        </div>
      )}

      <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
        {data.name}
      </h1>

      {data?.description ? (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      ) : (
        <p className="text-gray-500">No description available.</p>
      )}
    </div>
  );
};

export default DynamicPage;
