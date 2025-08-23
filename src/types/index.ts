export type TProduct = {
  [key: string]: any;
  name: string;
  image: string;
  description: string;
  price: number;
  regularPrice: number;
  inStock: number;
  brand: string;
  processor_type: string;
  processor_model: string;
  generation: string;
  display: string;
  display_size: string;
  display_type: string;
  ram: string;
  ram_type: string;
  hdd: string;
  ssd: string;
  graphics: string;
  operating_system: string;
  features?: string[];
};

export type TProductResponse = TProduct & {
  _id: string;
  rating: number;
  slug: string;
  reviews?: any;
  createdAt: string;
  updatedAt: string;
  brand: any;
};

export type TReviews = {
  rating: number;
  message: string;
  userId: string;
  productId: string;
};

export type TReviewsResponse = {
  numberOfReviews?: number;
  userReview:[{userId?: {
    name: string;
    email: string;
    avatar: string;
  },
  comment: string,
  rating: number
  }];
} & TReviews;

export type TOldProduct = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  [vlaue: string]: any;
};

type MetaData = {
  totalPages: number;
  page: number;
};

export type TServerResponse<T> = {
  data: any;
  success: boolean;
  message: string;
  meta?: MetaData;
  result: T;
};

export type TCreateHotOffer = {
  discount: number;
  productId: string;
  endDate: string;
};

export type TBanner = {
  discount: number;
  endDate: string;
  price: number;
  id: string;
  product: TProductResponse;
};

export type THotOfferResponse = {
  discountValue: number;
  brand: any;
  _id: string;
  id: string;
  image: string;
  ratings: number;
  category: string;
  discount: number;
  startDate: string;
  endDate: string;
  price: number;
  productName: string;
  applicableProducts: [TProductResponse];
};
export type TFeaturedProductResponse = {
  id: string;
  productId: string;
  product: TProductResponse;
};
export type CartProductType = {
  id: string;
  name: string;
  photo: string;
  image?: string;
  variantId?: string;
  freeShipping?: boolean;
  price: number;
  productQuantity: any;
};
export type WishProductType = {
  id: string;
  name: string;
  photo: string;
  price: number;
  productQuantity: any;
};
export type TUserRegistration = {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPass: string;
};

export type TUserRegistrationResponse = {
  id: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  avatar: string;
};

export type TLoginResponse = {
  avatar: string;
  authToken: string;
  isAdmin: boolean;
};

export type TUserResponse = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPass: string;
};

export type TAddress = {
  street: string;
  postCode: string;
  city: string;
  country: string;
};

export type TOrderProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type TOrderRequest = {
  userId: string;
  totalPrice: number;
  items: TOrderProduct[];
};

export type TOrderResponse = {
  id: string;
  userId: string;
  totalPrice: number;
  createdAt: string;
  updateAt: string;
};

// NEW TYPES

// Type for a single product variant
export type TProductVariant = {
  type: string;
  value: string;
  _id: string;
};

// Type for inventory
export type TInventory = {
  quantity: number;
  inStock: boolean;
  _id: string;
};

// Type for sub-category
export type TSubCategory = {
  _id: string;
  name: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface FormData {
  country: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface Address {
  _id: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Socials {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  tiktok: string;
}
