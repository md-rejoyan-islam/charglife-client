import React from "react";
import { TProductResponse } from "@/types";
import { Tag, DollarSign, Package, Briefcase } from 'lucide-react';
import { Badge } from "@/components/ui/Badge";

export default function ProductInfo({
  product,
}: {
  product: TProductResponse;
}) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div 
      className="bg-white rounded-lg p-2 space-y-1"

    >
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-gray-800">
          {product?.name}
        </h2>
        <p className="text-lg text-gray-600">
          {product?.processor_model} {product?.generation} {product?.display}
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <InfoItem
          icon={<DollarSign className="w-5 h-5" />}
          label="Discounted Price"
          value={`৳${product?.price.toFixed(2)}`}
        />
        <InfoItem
          icon={<Tag className="w-5 h-5" />}
          label="Regular Price"
          value={`৳${product?.displayPrice.toFixed(2)}`}
        />
        <InfoItem
          icon={<Package className="w-5 h-5" />}
          label="Status"
          value={product.inventory.reduce((sum:any, variant:any) => sum + (variant?.quantity || 0), 0) > 0 ? "In Stock" : "Out of Stock"}
        />
        <InfoItem
          icon={<Briefcase className="w-5 h-5" />}
          label="Brand"
          value={product?.brand?.name?.toUpperCase()}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {product?.inventory?.inStock > 0 && (
          <Badge variant="success" className="text-sm">
            Available
          </Badge>
        )}
        {product?.price < product?.displayPrice && (
          <Badge variant="destructive" className="text-sm">
            Sale
          </Badge>
        )}
        <Badge variant="outline" className="text-sm">
          {product?.brand?.name}
        </Badge>
      </div>

    </div>
  );
}

function InfoItem({ icon, label, value }:{icon:any, label:any, value:any}) {
  return (
    <div className="flex items-center space-x-3 bg-gray-50 rounded-md p-3 transition-all duration-300 hover:bg-gray-100">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

