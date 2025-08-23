"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@headlessui/react";
import { config } from "@/config";

const CarrerContainer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    message: "",
    cv: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    form.append("address1", formData.address1);
    form.append("address2", formData.address2);
    form.append("message", formData.message);
    if (formData.cv) {
      form.append("pdf", formData.cv);
    }

    try {
      const response = await fetch(`${config.backend_url}/career`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          address1: "",
          address2: "",
          message: "",
          cv: null,
        });
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto my-8">
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="grid lg:grid-cols-2 gap-6 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-blue-600 mb-4">
                Career With Us
              </h1>
              <p className="text-gray-600 mb-6">
                Join charg Tech for an innovative, impactful career. Grow
                professionally, collaborate, and make a difference in
                hospitality tech. Explore roles like Software Developer, Sales,
                Customer Support.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line One</Label>
                  <Input
                    id="address1"
                    placeholder="Address Line One"
                    value={formData.address1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line Two</Label>
                  <Input
                    id="address2"
                    placeholder="Address Line Two"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Message"
                  className="min-h-[100px] resize-none"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">Upload your CV</Label>
                <Input
                  id="cv"
                  type="file"
                  className="cursor-pointer"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-black hover:bg-black/70"
              >
                Submit
              </Button>
            </form>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-400/20 to-orange-900/40 rounded-lg z-10" />
            <div className="relative h-full">
              <Image
                src="/img/black-n-red-logo.png"
                alt="Scenic beach sunset"
                className="object-cover rounded-lg h-full"
                width={600}
                height={800}
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <p
                  className="text-white text-4xl font-light text-center leading-relaxed"
                  style={{ fontFamily: "Dancing Script, cursive" }}
                >
                  {"Let's explore"}
                  <br />
                  {"Bangladesh with"}
                  <br />
                  <span className="text-black font-bold">{"Charg "}</span>{"and"}
                  <br />
                  {"discover its"}
                  <br />
                  {"business"}
                  <br />
                  {"opportunities"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrerContainer;
