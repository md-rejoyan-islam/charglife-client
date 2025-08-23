"use client";

import { toast } from "sonner";
import { config } from "@/config";
import { FormData } from "@/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import {  useEffect, useState } from "react";
import CartProductList from "@/components/ui/cart-sidebar/cart-product-list";
import { CheckOutlined } from "@ant-design/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {  Truck } from "lucide-react";
import ClientSecureWrapper from "@/components/hoc/ClientSecureWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { selectedUserToken } from "@/redux/slice/authSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";
import { getCookie, setCookie } from "@/assets/helper";

interface ShippingMethod {
  _id: string;
  name: string;
  amount: number;
  active: boolean;
}

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  password: z.string().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().optional(),
  postcode: z.string().optional(),
});

export default function Component() {
  const [formData, setFormData] = useState<FormData>({
    country: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    email: "",
    phone: "",
  });
  const dispatch=useDispatch()
  const router = useRouter();
const searchParams=useSearchParams()
const orderDataRedirect = getCookie("orderData");
 
    const token = useAppSelector(selectedUserToken);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default to COD
  const { cartItems, totalAmount, appliedCoupon, discountedTotal } = useAppSelector(
    (state) => state?.cart
  );
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  const [filteredShippingMethods, setFilteredShippingMethods] = useState<ShippingMethod[]>([]);
  const [hasFreeShipping, setHasFreeShipping] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch, 
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const city = watch("city")

  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
const [selectedShippingAmount, setSelectedShippingAmount] = useState<number>(0);

const handleChange = (e: any) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  };
  
  useEffect(() => {
    
    if (orderDataRedirect) {
      if (searchParams.get("payment") == "success") {
        orderDataRedirect.bkashPaymentDetails=searchParams.get("id")
        postOrder(orderDataRedirect);
   }  
   searchParams.get("payment")=="fail" && toast.error("Payment Failed")
    }

  }, [])

  

// const signUpUser = async (userdata: any) => {
//   try {
//     const response = await fetch(`${config.backend_url}/user/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userdata),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data?.errorSources?.[0]?.message || "Registration failed");
//     }

//     toast.success(data?.message);
//     return data?.data?.id; // Return user ID
//   } catch (error: any) {
//     toast.error(error.message);
//     throw error;
//   }
//   };
  const payWithBkash = async (datas: any) => {
  try {
    const response = await fetch(`${config.backend_url}/bkash/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errorSources?.[0]?.message || "Payment failed");
    }
    window.location.href=data?.data?.bkashURL
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

    // Fetch user shipping address
    useEffect(() => {
      const fetchUserData = async () => {
        try {
             const response = await fetch(`${config.backend_url}/user/${userId}`, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const data = await response.json();

                if (response.ok && data?.data?.shippingAddress) {
                  setValue("firstName", data.data.shippingAddress.name?.split(" ")[0] || "");
                  setValue("lastName", data.data.shippingAddress.name?.split(" ")[1] || "");
                  setValue("phone", data.data.shippingAddress.phone || "");
                  setValue("address", data.data.shippingAddress.address || "");
                  setValue("country", data.data.shippingAddress.country || "");
                  setValue("email", data.data.shippingAddress.email || "");
                  setValue("city", data.data.shippingAddress.town || "");
                  setValue("postcode", data.data.shippingAddress.zip || "");
                }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user details.");
        }
      };
  
      if (userId) {
        fetchUserData();
      }
    }, [userId]);
  
  
  const postOrder = async (orderData: any) => {
    try {
      if (orderData?.items?.length < 1) {
        toast.success("Add product to cart first")
        return 
      }
   
      const response = await fetch(`${config.backend_url}/orders/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        if (orderData?.paymentMethod === "cod") {
          toast.success(
            "Order placed successfully! Cash on Delivery selected."
          );
        } else {
          toast.success("Order placed successfully!");
        }
        dispatch(clearCart());
        router.push("/");
      } else {
        toast.warning(result?.message || "Error submitting the order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.warning("There was an error placing the order.");
    }
  }


  const onSubmit = async (formData: any) => {
    let orderUserId = userId ? userId : null
    
    // const userdata = {
    //   name: `${formData?.firstName} ${formData?.lastName}`,
    //   email: formData?.email,
    //   password: formData?.password,
    //   avatar:
    //     "https://example.com/profile/johndoe.jpg",
    //   isAdmin: false,
    // };

    // if (!user) {
    //   try {
    //     orderUserId = await signUpUser(userdata);
    //   } catch (error) {
    //     console.error("Sign-up failed:", error);
    //   }
    // }
    // if (orderUserId == null) {
    //   return
    // }
  

    const reformItems = cartItems.map((item:any) => ({
      product: item?.id,
      quantity: item?.productQuantity,
      variantId: item?.variantId,
      price:item?.price,
    }));

    const orderData:any = {
      userId:orderUserId,
      shippingAddress: {
        name: `${formData?.firstName} ${formData?.lastName}`,
        phone: formData?.phone,
        address: `${formData?.address} ${formData?.address2}`,
        country: formData?.country,
        email: formData?.email,
        town: formData?.city,
        zip: formData?.postcode,
      },
      items: reformItems,
      totalAmount: totalAmount + selectedShippingAmount,
      finalAmount: discountedTotal + selectedShippingAmount,
      paymentMethod,
      coupon:(appliedCoupon as any)?._id,
      paymentStatus: "pending",
      shipping:selectedShipping
    };

    if (paymentMethod === "bkash") { 
      await payWithBkash({
        amount: discountedTotal + selectedShippingAmount,
        number: formData?.phone,
        orderId:orderUserId,
      }) 
      setCookie("orderData",orderData,10)
      return
    }

    postOrder(orderData);
  };

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await fetch(`${config.backend_url}/shipping`);
        const data = await response.json();
        if (response.ok) {
          setShippingMethods(data.data.result);
             
          if (data.data.result.length > 0) {
            const hasFreeShipping = cartItems.some((item) => item.freeShipping) || data.data.result.find((method: any) => method.name.toLowerCase().includes("free shipping above"))?.amount<=discountedTotal;
            const filteredShippingMethods = hasFreeShipping
    ? data.data.result.filter((method:any) => method.amount === 0)
              : data.data.result;     
          setSelectedShipping(filteredShippingMethods[0]._id);
          setSelectedShippingAmount(filteredShippingMethods[0].amount);
          }
  
        }
      } catch (error) {
        console.error("Error fetching shipping:", error);
      
      }
    };

    fetchShippingMethods();
  }, [cartItems]);

  useEffect(() => {
    
    if (filteredShippingMethods.length > 0) {
      let selectedMethod;
  
      if (hasFreeShipping) {
        // If any product has free shipping, select the free shipping method
        selectedMethod = filteredShippingMethods.find((method) => method.amount === 0);
      } else if (city === "Dhaka") {
        // If district is Dhaka, select the shipping method that mentions "inside Dhaka"
        selectedMethod = filteredShippingMethods.find((method) =>
          method.name.toLowerCase().includes("inside dhaka")
        );
      }
  
      // If no specific selection found, fallback to the first available shipping method
      if (!selectedMethod) {
        selectedMethod = filteredShippingMethods[0];
      }
  
      if (selectedMethod) {
        setSelectedShipping(selectedMethod._id);
        setSelectedShippingAmount(selectedMethod.amount);
      }
    }
  }, [city, hasFreeShipping, filteredShippingMethods]);

  


  
  useEffect(() => {
    // Check if any product in the cart has freeShipping
    const freeShippingAvailable = cartItems.some((item) => item.freeShipping) || (shippingMethods.find((method) => method.name.toLowerCase().includes("free shipping above"))?.amount??10000000) <= discountedTotal;
    setHasFreeShipping(freeShippingAvailable);
  
    // Filter shipping methods based on free shipping eligibility
    const updatedShippingMethods = freeShippingAvailable
      ? shippingMethods
      : shippingMethods.filter((method) => method.amount !== 0);
  
    setFilteredShippingMethods(updatedShippingMethods);
  }, [cartItems, shippingMethods]);
  
  return (

    <div className="max-w-7xl mx-auto overflow-hidden py-8 md:py-12 px-4 lg:px-0">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="space-y-6 p-6">
            <h2 className="font-medium bg-black/80 text-white p-2 flex items-center space-x-2">
              <span className="bg-white text-black rounded-full h-6 w-6 flex items-center mr-3 justify-center">
                1
              </span>
              Billing Details
            </h2>
            <form
              className="space-y-5 gap-2 flex-col mx-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">
                    First Name <span className="text-primary">*</span>
                  </Label>
                  <Input placeholder="First Name" {...register("firstName")} />
                </div>
                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-primary">*</span>
                  </Label>
                  <Input placeholder="Last Name" {...register("lastName")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone">
                    Phone <span className="text-primary">*</span>
                  </Label>
                  <Input placeholder="Phone" {...register("phone")} />
                </div>
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-primary"></span>
                  </Label>
                  <Input placeholder="Email" {...register("email")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-primary">*</span>
                </Label>
                <Input placeholder="Address" {...register("address")} />
                <Input placeholder="Address" {...register("address2")} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 grid-cols-2">
                {/* <div>
                  <Label htmlFor="country">
                    Country
                  </Label>
                  <Input placeholder="Country" {...register("country")} />
                </div> */}
                <div>
                <Label htmlFor="city">
                    District <span className="text-primary">*</span>
                  </Label>
                  <select
  {...register("city")}
  className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[12px] mt-[-1px]"
>
  <option value="">Select District</option>
  <option value="Bagerhat">Bagerhat</option>
  <option value="Bandarban">Bandarban</option>
  <option value="Barguna">Barguna</option>
  <option value="Barisal">Barisal</option>
  <option value="Bhola">Bhola</option>
  <option value="Bogra">Bogra</option>
  <option value="Brahmanbaria">Brahmanbaria</option>
  <option value="Chandpur">Chandpur</option>
  <option value="Chattogram">Chattogram</option>
  <option value="Chuadanga">Chuadanga</option>
  <option value="Comilla">Comilla</option>
  <option value="Cox's Bazar">Cox's Bazar</option>
  <option value="Dhaka">Dhaka</option>
  <option value="Dinajpur">Dinajpur</option>
  <option value="Faridpur">Faridpur</option>
  <option value="Feni">Feni</option>
  <option value="Gaibandha">Gaibandha</option>
  <option value="Gazipur">Gazipur</option>
  <option value="Gopalganj">Gopalganj</option>
  <option value="Habiganj">Habiganj</option>
  <option value="Jamalpur">Jamalpur</option>
  <option value="Jashore">Jashore</option>
  <option value="Jhalokathi">Jhalokathi</option>
  <option value="Jhenaidah">Jhenaidah</option>
  <option value="Joypurhat">Joypurhat</option>
  <option value="Khagrachari">Khagrachari</option>
  <option value="Khulna">Khulna</option>
  <option value="Kishoreganj">Kishoreganj</option>
  <option value="Kurigram">Kurigram</option>
  <option value="Kushtia">Kushtia</option>
  <option value="Lakshmipur">Lakshmipur</option>
  <option value="Lalmonirhat">Lalmonirhat</option>
  <option value="Madaripur">Madaripur</option>
  <option value="Magura">Magura</option>
  <option value="Manikganj">Manikganj</option>
  <option value="Meherpur">Meherpur</option>
  <option value="Moulvibazar">Moulvibazar</option>
  <option value="Munshiganj">Munshiganj</option>
  <option value="Mymensingh">Mymensingh</option>
  <option value="Naogaon">Naogaon</option>
  <option value="Narail">Narail</option>
  <option value="Narayanganj">Narayanganj</option>
  <option value="Narsingdi">Narsingdi</option>
  <option value="Natore">Natore</option>
  <option value="Netrokona">Netrokona</option>
  <option value="Nilphamari">Nilphamari</option>
  <option value="Noakhali">Noakhali</option>
  <option value="Pabna">Pabna</option>
  <option value="Panchagarh">Panchagarh</option>
  <option value="Patuakhali">Patuakhali</option>
  <option value="Pirojpur">Pirojpur</option>
  <option value="Rajbari">Rajbari</option>
  <option value="Rajshahi">Rajshahi</option>
  <option value="Rangamati">Rangamati</option>
  <option value="Rangpur">Rangpur</option>
  <option value="Satkhira">Satkhira</option>
  <option value="Shariatpur">Shariatpur</option>
  <option value="Sherpur">Sherpur</option>
  <option value="Sirajganj">Sirajganj</option>
  <option value="Sunamganj">Sunamganj</option>
  <option value="Sylhet">Sylhet</option>
  <option value="Tangail">Tangail</option>
  <option value="Thakurgaon">Thakurgaon</option>
</select>

                </div>
                <div>
                  <Label htmlFor="postcode">
                    Postcode / ZIP 
                  </Label>
                  <Input placeholder="Postcode" {...register("postcode")} />
                </div>
              </div>
             {/* {!user && <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-primary">*</span>
                </Label>
                <Input placeholder="Password" {...register("password")} />
              </div>} */}
              <Button type="submit" className="w-full text-white bg-black">
                Place order
              </Button>
            </form>
          </Card>
        </div>
        <div className="space-y-4">
        <Card>
  <div className="p-6">
    <h2 className="font-medium bg-black/80 text-white p-2 flex items-center space-x-2">
      <span className="bg-white text-black rounded-full h-6 w-6 flex items-center mr-3 justify-center">
        <CheckOutlined />
      </span>
      Your order
    </h2>
    <CartProductList />
    <div className="flex items-center justify-between">
      <p>Subtotal:</p>
      <p>৳{totalAmount}</p>
    </div>
    <div className="flex items-center justify-between">
      <p>Shipping:</p>
      <p>৳{selectedShippingAmount}</p>
    </div>
    {appliedCoupon && (
      <div className="flex items-center justify-between">
        <p>Discount ({appliedCoupon.code}):</p>
        <p>-৳{totalAmount- discountedTotal}</p>
      </div>
    )}
    <div className="flex items-center justify-between font-bold">
      <p>Total:</p>
      <p>৳{discountedTotal + selectedShippingAmount}</p>
    </div>
  </div>
</Card>

<Card className="space-y-6 p-6">
      <h2 className="font-medium bg-black/80 text-white p-2 flex items-center space-x-2">
        <span className="bg-white text-black rounded-full h-6 w-6 flex items-center mr-3 justify-center">
          2
        </span>
        Shipping Method
      </h2>
      <RadioGroup
      disabled
  value={selectedShipping ?? ""}
  className="space-y-4"
  onValueChange={(value) => {
    setSelectedShipping(value);
    const shippingMethod = filteredShippingMethods.find((method) => method._id === value);
    setSelectedShippingAmount(shippingMethod ? shippingMethod.amount : 0);
  }}
>
  {selectedShipping ? (
    (() => {
      const selectedMethod = filteredShippingMethods.find(method => method._id === selectedShipping);
      return selectedMethod ? (
        <div key={selectedMethod._id} className="flex items-center space-x-3">
          <RadioGroupItem value={selectedMethod._id} id={selectedMethod._id} />
          <Truck className="h-5 w-5 text-muted-foreground" />
          <Label htmlFor={selectedMethod._id} className="text-base text-muted-foreground">
            {selectedMethod.name} - {selectedMethod.amount === 0 ? "Free" : `৳${selectedMethod.amount}`}
          </Label>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No shipping options available</p>
      );
    })()
  ) : (
    <p className="text-sm text-muted-foreground">No shipping option selected</p>
  )}
</RadioGroup>

          </Card>
          <Card className="space-y-6 p-6">
      <h2 className="font-medium bg-black/80 text-white p-2 flex items-center space-x-2">
        <span className="bg-white text-black rounded-full h-6 w-6 flex items-center mr-3 justify-center">
          3
        </span>
        Payment Method
      </h2>
      <RadioGroup
  value={paymentMethod}
  className="space-y-4"
  onValueChange={(value) => {
 setPaymentMethod(value)
  }}
>
<div className="flex items-center space-x-3">
          <RadioGroupItem value="cod" id="cod" />
          <Truck className="h-5 w-5 text-muted-foreground" />
          <Label htmlFor="cod" className="text-base text-muted-foreground">
          COD - Cash on Delivery
          </Label>
              </div>
              <div className="flex items-center space-x-3">
          <RadioGroupItem value="bkash" id="bkash" />
          <Truck className="h-5 w-5 text-muted-foreground" />
          <Label htmlFor="bkash" className="text-base text-muted-foreground">
         Bkash
          </Label>
        </div>
</RadioGroup>

    </Card>
        </div>
      </div>
    </div>

  );
}
