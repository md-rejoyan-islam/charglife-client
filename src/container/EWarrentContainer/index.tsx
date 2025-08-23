"use client";

import z from "zod";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { config } from "@/config";
import { toast } from "sonner";

const formSchema = z.object({
    productId: z.string().min(1, { message: "Product ID is required." }),
    purchaseDate: z.string().min(1, { message: "Purchase date is required." }),
    productNumber: z.string().min(1, { message: "Product Number is required." }),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    division: z.string().min(1, { message: "Please select a division." }),
    district: z.string().min(1, { message: "Please select a district." }),
    thana: z.string().min(1, { message: "Please select a thana." }),
    warrantyPeriod: z.number().min(1, { message: "Warranty period is required." }),
    warrantyPeriodType: z.enum(["days", "weeks", "months", "years"], {
        message: "Warranty period type is required.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

// More comprehensive mock data for Bangladesh divisions, districts, and thanas
const locationData: any = {
    "Dhaka": {
        "Dhaka": ["Mirpur", "Gulshan", "Dhanmondi", "Mohammadpur", "Uttara"],
        "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
        "Narayanganj": ["Narayanganj Sadar", "Sonargaon", "Araihazar", "Rupganj", "Bandar"]
    },
    "Chittagong": {
        "Chittagong": ["Halishahar", "Kotwali", "Pahartali", "Bakalia", "Chandgaon"],
        "Cox's Bazar": ["Cox's Bazar Sadar", "Teknaf", "Ukhia", "Maheshkhali", "Ramu"],
        "Comilla": ["Comilla Sadar", "Chandina", "Daudkandi", "Homna", "Laksam"]
    },
    "Rajshahi": {
        "Rajshahi": ["Boalia", "Motihar", "Rajpara", "Shah Makhdum", "Godagari"],
        "Bogra": ["Bogra Sadar", "Gabtali", "Sherpur", "Shibganj", "Kahaloo"],
        "Pabna": ["Pabna Sadar", "Ishwardi", "Atghoria", "Bera", "Santhia"]
    },
    "Khulna": {
        "Khulna": ["Khulna Sadar", "Dumuria", "Terokhada", "Dighalia", "Rupsa"],
        "Jessore": ["Jessore Sadar", "Manirampur", "Jhikargachha", "Keshabpur", "Abhaynagar"],
        "Satkhira": ["Satkhira Sadar", "Kalaroa", "Tala", "Kaliganj", "Shyamnagar"]
    },
    "Barisal": {
        "Barisal": ["Barisal Sadar", "Bakerganj", "Babuganj", "Wazirpur", "Banaripara"],
        "Bhola": ["Bhola Sadar", "Borhanuddin", "Charfesson", "Daulatkhan", "Lalmohan"],
        "Patuakhali": ["Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara"]
    },
    "Sylhet": {
        "Sylhet": ["Sylhet Sadar", "Beanibazar", "Golapganj", "Companiganj", "Fenchuganj"],
        "Moulvibazar": ["Moulvibazar Sadar", "Kulaura", "Kamalganj", "Rajnagar", "Sreemangal"],
        "Sunamganj": ["Sunamganj Sadar", "Chhatak", "Jagannathpur", "Derai", "Bishwamvarpur"]
    },
    "Rangpur": {
        "Rangpur": ["Rangpur Sadar", "Badarganj", "Mithapukur", "Gangachara", "Kaunia"],
        "Dinajpur": ["Dinajpur Sadar", "Birganj", "Bochaganj", "Biral", "Ghoraghat"],
        "Kurigram": ["Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Phulbari"]
    },
    "Mymensingh": {
        "Mymensingh": ["Mymensingh Sadar", "Bhaluka", "Trishal", "Haluaghat", "Muktagachha"],
        "Jamalpur": ["Jamalpur Sadar", "Dewanganj", "Bakshiganj", "Madarganj", "Melandaha"],
        "Netrokona": ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri"]
    }
};

const EWarrentContainer = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        setValue,
    } = useForm < FormValues > ({
        resolver: zodResolver(formSchema),
    });
    const [products, setProducts] = useState < { id: string; name: string }[] > ([]);
    const [divisions, setDivisions] = useState < string[] > ([]);
    const [districts, setDistricts] = useState < string[] > ([]);
    const [thanas, setThanas] = useState < string[] > ([]);

    const selectedDivision = watch("division");
    const selectedDistrict = watch("district");

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${config.backend_url}/item/search?page=1&limit=100`);
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setProducts(data?.data?.result || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setDivisions(Object.keys(locationData));
    }, []);

    useEffect(() => {
        if (selectedDivision) {
            setDistricts(Object.keys(locationData[selectedDivision]));
            setValue("district", "");
            setValue("thana", "");
        }
    }, [selectedDivision, setValue]);

    useEffect(() => {
        if (selectedDivision && selectedDistrict) {
            setThanas(locationData[selectedDivision][selectedDistrict]);
            setValue("thana", "");
        }
    }, [selectedDivision, selectedDistrict, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch(`${config.backend_url}/e-warrenty`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.status == 400) {
                toast.error("Not Valid Inputs");
                return
            }

            toast.success("Applied for e-warranty successfull and admin will review it soon.");
            reset()

        } catch (error) {

            console.error("Error submitting form:", error);
        }
    };
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg my-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Get Your Product e-Warranty
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product dropdown */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Product</label>
                        <select
                            {...register("productId")}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Product</option>
                            {products?.map((product: any) => (
                                <option key={product._id} value={product._id}>
                                    {product.productName}
                                </option>
                            ))}
                        </select>
                        {errors.productId && (
                            <p className="text-red-500 text-sm">{errors.productId.message}</p>
                        )}
                    </div>
                    {[
                        { label: "Purchase Date", name: "purchaseDate", type: "date" },
                        { label: "Product Number", name: "productNumber", type: "text" },
                        { label: "Name", name: "name", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Phone", name: "phone", type: "tel" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="flex flex-col">
                            <label className="text-gray-700 mb-1">{label}</label>
                            <input
                                type={type}
                                {...register(name as keyof FormValues)}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors[name as keyof FormValues] && (
                                <p className="text-red-500 text-sm">
                                    {errors[name as keyof FormValues]?.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Division</label>
                        <select
                            {...register("division")}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Division</option>
                            {divisions?.map((division) => (
                                <option key={division} value={division}>
                                    {division}
                                </option>
                            ))}
                        </select>
                        {errors.division && (
                            <p className="text-red-500 text-sm">{errors.division.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">District</label>
                        <select
                            {...register("district")}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select District</option>
                            {districts?.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                        {errors.district && (
                            <p className="text-red-500 text-sm">{errors.district.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Thana</label>
                        <select
                            {...register("thana")}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Thana</option>
                            {thanas?.map((thana) => (
                                <option key={thana} value={thana}>
                                    {thana}
                                </option>
                            ))}
                        </select>
                        {errors.thana && (
                            <p className="text-red-500 text-sm">{errors.thana.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Warranty Period</label>
                        <input
                            type="number"
                            {...register("warrantyPeriod", { valueAsNumber: true })}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.warrantyPeriod && (
                            <p className="text-red-500 text-sm">
                                {errors.warrantyPeriod.message}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Warranty Period Type</label>
                        <select
                            {...register("warrantyPeriodType")}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Period Type</option>
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                        {errors.warrantyPeriodType && (
                            <p className="text-red-500 text-sm">
                                {errors.warrantyPeriodType.message}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#100f11] text-white p-3 rounded-lg shadow-md transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EWarrentContainer;