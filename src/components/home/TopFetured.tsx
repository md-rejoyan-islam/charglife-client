import { Truck, Percent, RotateCcw, CreditCard, Tag, Recycle } from "lucide-react";

export default function TopFeatured() {
  const features = [
    {
      icon: <Tag className="h-6 w-6 text-yellow-400" />,
      title: "100% ",
      description: "CHARG Genuine Product",
    },
    {
      icon: <Recycle className="h-6 w-6 text-yellow-400" />,
      title: "Official Replacement",
      description: "Warranty",
    },
    {
      icon: <Truck className="h-6 w-6 text-yellow-400" />,
      title: "Cash",
      description: "on Delivery",
    },
    {
      icon: <Percent className="h-6 w-6 text-yellow-400" />,
      title: "3000 TK",
      description: "Free delivery over",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-yellow-400" />,
      title: "Return",
      description: "Easy Return",
    },
  ];

  return (
    <div className="container mx-auto pt-8 hidden md:block">
      <div className="w-full border border-gray-200 rounded-lg">
    
          {/* For larger screens, use grid layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 text-center gap-4"
              >
                <div className="mb-2">{feature.icon}</div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[darkgray]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* For smaller screens, use a horizontally scrollable container */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 p-2">
            {features.map((feature, index) => (
                <div
  key={index}
  className="flex items-center justify-center p-6 text-center gap-4"
>
  <div className="mb-2">{feature.icon}</div>
  <div>
    <h3 className="text-sm font-medium text-gray-700 whitespace-nowrap">
      {feature.title}
    </h3>
    <p className="text-sm text-[darkgray] whitespace-nowrap">
      {feature.description}
    </p>
  </div>
</div>
            ))}
          </div>
    
      </div>
    </div>
  );
}
