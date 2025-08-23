"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Clock, Package, Truck, AlertCircle, XCircle, PauseCircle, Search, Loader2 } from 'lucide-react'
import { config } from "@/config"

// Define the tracking response interface based on the actual API response
interface TrackingResponse {
  status: number
  delivery_status: DeliveryStatus
}

// Define the delivery status type
type DeliveryStatus =
  | "pending"
  | "delivered_approval_pending"
  | "partial_delivered_approval_pending"
  | "cancelled_approval_pending"
  | "unknown_approval_pending"
  | "delivered"
  | "partial_delivered"
  | "cancelled"
  | "hold"
  | "in_review"
  | "unknown"

const TrackOrderContainer = () => {
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingResult, setTrackingResult] = useState<TrackingResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrackOrder = async () => {
    if (!trackingCode.trim()) {
      setError("Please enter a tracking code")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${config.backend_url}/orders/track-order/steafast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingCode }),
      })

      const data = await response.json()

      if (response.ok) {
        setTrackingResult(data.data.data)
      } else {
        setError("Failed to track order. Please try again.")
      }
    } catch (err) {
      setError("An error occurred while tracking your order. Please try again.")
      console.error("Error tracking order:", err)
    } finally {
      setLoading(false)
    }
  }

  // Get the current step based on the delivery status
  const getCurrentStep = (status: DeliveryStatus): number => {
    switch (status) {
      case "in_review":
        return 1
      case "pending":
        return 2
      case "hold":
        return 2 // Same as pending but with a different icon
      case "delivered_approval_pending":
      case "partial_delivered_approval_pending":
      case "cancelled_approval_pending":
      case "unknown_approval_pending":
        return 3
      case "delivered":
      case "partial_delivered":
      case "cancelled":
        return 4
      case "unknown":
      default:
        return 0
    }
  }

  // Get status details based on the delivery status
  const getStatusDetails = (status: DeliveryStatus) => {
    const statusMap = {
      pending: {
        title: "Pending",
        description: "Your order is being processed and prepared for delivery.",
        icon: <Clock className="h-8 w-8 text-[#f59e0b]" />,
        color: "text-[#f59e0b]",
        bgColor: "bg-[#fef3c7]",
        borderColor: "border-[#f59e0b]",
      },
      delivered_approval_pending: {
        title: "Delivered (Approval Pending)",
        description: "Your order has been delivered and is awaiting approval.",
        icon: <CheckCircle2 className="h-8 w-8 text-[#3b82f6]" />,
        color: "text-[#3b82f6]",
        bgColor: "bg-[#dbeafe]",
        borderColor: "border-[#3b82f6]",
      },
      partial_delivered_approval_pending: {
        title: "Partially Delivered (Approval Pending)",
        description: "Part of your order has been delivered and is awaiting approval.",
        icon: <CheckCircle2 className="h-8 w-8 text-[#3b82f6]" />,
        color: "text-[#3b82f6]",
        bgColor: "bg-[#dbeafe]",
        borderColor: "border-[#3b82f6]",
      },
      cancelled_approval_pending: {
        title: "Cancelled (Approval Pending)",
        description: "Your order cancellation is awaiting approval.",
        icon: <XCircle className="h-8 w-8 text-[#f97316]" />,
        color: "text-[#f97316]",
        bgColor: "bg-[#ffedd5]",
        borderColor: "border-[#f97316]",
      },
      unknown_approval_pending: {
        title: "Unknown Status (Approval Pending)",
        description: "Your order has an unknown status and is awaiting review. Please contact support.",
        icon: <AlertCircle className="h-8 w-8 text-[#a855f7]" />,
        color: "text-[#a855f7]",
        bgColor: "bg-[#f3e8ff]",
        borderColor: "border-[#a855f7]",
      },
      delivered: {
        title: "Delivered",
        description: "Your order has been successfully delivered.",
        icon: <CheckCircle2 className="h-8 w-8 text-[#22c55e]" />,
        color: "text-[#22c55e]",
        bgColor: "bg-[#dcfce7]",
        borderColor: "border-[#22c55e]",
      },
      partial_delivered: {
        title: "Partially Delivered",
        description: "Part of your order has been delivered.",
        icon: <CheckCircle2 className="h-8 w-8 text-[#22c55e]" />,
        color: "text-[#22c55e]",
        bgColor: "bg-[#dcfce7]",
        borderColor: "border-[#22c55e]",
      },
      cancelled: {
        title: "Cancelled",
        description: "Your order has been cancelled.",
        icon: <XCircle className="h-8 w-8 text-[#ef4444]" />,
        color: "text-[#ef4444]",
        bgColor: "bg-[#fee2e2]",
        borderColor: "border-[#ef4444]",
      },
      hold: {
        title: "On Hold",
        description: "Your order is currently on hold.",
        icon: <PauseCircle className="h-8 w-8 text-[#eab308]" />,
        color: "text-[#eab308]",
        bgColor: "bg-[#fef9c3]",
        borderColor: "border-[#eab308]",
      },
      in_review: {
        title: "In Review",
        description: "Your order has been placed and is being reviewed.",
        icon: <Clock className="h-8 w-8 text-[#3b82f6]" />,
        color: "text-[#3b82f6]",
        bgColor: "bg-[#dbeafe]",
        borderColor: "border-[#3b82f6]",
      },
      unknown: {
        title: "Unknown Status",
        description: "Your order has an unknown status. Please contact support.",
        icon: <AlertCircle className="h-8 w-8 text-[#6b7280]" />,
        color: "text-[#6b7280]",
        bgColor: "bg-[#f3f4f6]",
        borderColor: "border-[#6b7280]",
      },
    }

    return statusMap[status] || statusMap.unknown
  }

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Track Your Order</h1>

      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Enter your tracking code"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="h-14"
          />
          <Button onClick={handleTrackOrder} className="h-14 bg-black hover:bg-black/80 text-white" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Search className="h-5 w-5 mr-2" />}
            Track Order
          </Button>
        </div>
        {error && <p className="text-[#ef4444] mt-2">{error}</p>}
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : trackingResult ? (
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                <h2 className="text-xl font-semibold break-words">Order #{trackingCode}</h2>
                </div>
                <div className="mt-4 md:mt-0">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full ${
                      getStatusDetails(trackingResult.delivery_status).bgColor
                    }`}
                  >
                    {getStatusDetails(trackingResult.delivery_status).icon}
                    <span className={`ml-2 font-medium ${getStatusDetails(trackingResult.delivery_status).color}`}>
                      {getStatusDetails(trackingResult.delivery_status).title}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4">Order Status</h3>

              {/* Stepper UI */}
              <div className="relative">
                {/* Stepper line */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-[#e5e7eb]"></div>

                {/* Stepper steps */}
                <div className="space-y-8">
                  {/* Step 1: Order Placed */}
                  <div className="relative flex items-start">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center z-10 
                      ${
                        getCurrentStep(trackingResult.delivery_status) >= 1
                          ? "bg-[#dbeafe] border-2 border-[#3b82f6]"
                          : "bg-[#f3f4f6] border-2 border-[#d1d5db]"
                      }`}
                    >
                      <Package
                        className={`h-6 w-6 ${
                          getCurrentStep(trackingResult.delivery_status) >= 1 ? "text-[#3b82f6]" : "text-[#9ca3af]"
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      <h4
                        className={`text-lg font-medium ${
                          getCurrentStep(trackingResult.delivery_status) >= 1 ? "text-[#3b82f6]" : "text-[#6b7280]"
                        }`}
                      >
                        Order Placed
                      </h4>
                      <p className="text-[#6b7280]">Your order has been received and is being processed.</p>
                    </div>
                  </div>

                  {/* Step 2: Processing */}
                  <div className="relative flex items-start">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center z-10 
                      ${
                        getCurrentStep(trackingResult.delivery_status) >= 2
                          ? trackingResult.delivery_status === "hold"
                            ? "bg-[#fef9c3] border-2 border-[#eab308]"
                            : "bg-[#fef3c7] border-2 border-[#f59e0b]"
                          : "bg-[#f3f4f6] border-2 border-[#d1d5db]"
                      }`}
                    >
                      {trackingResult.delivery_status === "hold" && getCurrentStep(trackingResult.delivery_status) >= 2 ? (
                        <PauseCircle className="h-6 w-6 text-[#eab308]" />
                      ) : (
                        <Clock
                          className={`h-6 w-6 ${
                            getCurrentStep(trackingResult.delivery_status) >= 2 ? "text-[#f59e0b]" : "text-[#9ca3af]"
                          }`}
                        />
                      )}
                    </div>
                    <div className="ml-4">
                      <h4
                        className={`text-lg font-medium ${
                          getCurrentStep(trackingResult.delivery_status) >= 2
                            ? trackingResult.delivery_status === "hold"
                              ? "text-[#eab308]"
                              : "text-[#f59e0b]"
                            : "text-[#6b7280]"
                        }`}
                      >
                        {trackingResult.delivery_status === "hold" ? "On Hold" : "Processing"}
                      </h4>
                      <p className="text-[#6b7280]">
                        {trackingResult.delivery_status === "hold"
                          ? "Your order is currently on hold. We will update you soon."
                          : "Your order is being prepared for delivery."}
                      </p>
                    </div>
                  </div>

                  {/* Step 3: In Transit / Approval Pending */}
                  <div className="relative flex items-start">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center z-10 
                      ${
                        getCurrentStep(trackingResult.delivery_status) >= 3
                          ? trackingResult.delivery_status.includes("approval_pending")
                            ? "bg-[#dbeafe] border-2 border-[#3b82f6]"
                            : "bg-[#dbeafe] border-2 border-[#3b82f6]"
                          : "bg-[#f3f4f6] border-2 border-[#d1d5db]"
                      }`}
                    >
                      <Truck
                        className={`h-6 w-6 ${
                          getCurrentStep(trackingResult.delivery_status) >= 3 ? "text-[#3b82f6]" : "text-[#9ca3af]"
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      <h4
                        className={`text-lg font-medium ${
                          getCurrentStep(trackingResult.delivery_status) >= 3 ? "text-[#3b82f6]" : "text-[#6b7280]"
                        }`}
                      >
                        {trackingResult.delivery_status.includes("approval_pending") ? "Approval Pending" : "In Transit"}
                      </h4>
                      <p className="text-[#6b7280]">
                        {trackingResult.delivery_status.includes("approval_pending")
                          ? "Your order status is awaiting approval."
                          : "Your order is on its way to you."}
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Delivered / Cancelled */}
                  <div className="relative flex items-start">
                    <div
                      className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center z-10 
                      ${
                        getCurrentStep(trackingResult.delivery_status) >= 4
                          ? trackingResult.delivery_status === "cancelled"
                            ? "bg-[#fee2e2] border-2 border-[#ef4444]"
                            : "bg-[#dcfce7] border-2 border-[#22c55e]"
                          : "bg-[#f3f4f6] border-2 border-[#d1d5db]"
                      }`}
                    >
                      {trackingResult.delivery_status === "cancelled" && getCurrentStep(trackingResult.delivery_status) >= 4 ? (
                        <XCircle className="h-6 w-6 text-[#ef4444]" />
                      ) : (
                        <CheckCircle2
                          className={`h-6 w-6 ${
                            getCurrentStep(trackingResult.delivery_status) >= 4 ? "text-[#22c55e]" : "text-[#9ca3af]"
                          }`}
                        />
                      )}
                    </div>
                    <div className="ml-4">
                      <h4
                        className={`text-lg font-medium ${
                          getCurrentStep(trackingResult.delivery_status) >= 4
                            ? trackingResult.delivery_status === "cancelled"
                              ? "text-[#ef4444]"
                              : "text-[#22c55e]"
                            : "text-[#6b7280]"
                        }`}
                      >
                        {trackingResult.delivery_status === "cancelled"
                          ? "Cancelled"
                          : trackingResult.delivery_status === "partial_delivered"
                            ? "Partially Delivered"
                            : "Delivered"}
                      </h4>
                      <p className="text-[#6b7280]">
                        {trackingResult.delivery_status === "cancelled"
                          ? "Your order has been cancelled."
                          : trackingResult.delivery_status === "partial_delivered"
                            ? "Part of your order has been delivered successfully."
                            : "Your order has been delivered successfully."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}

export default TrackOrderContainer
