"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Globe, Phone } from "lucide-react"
import { config } from "@/config"

interface Store {
  _id: string
  image: string
  name: string
  city: string
  country: string
  phone: string
  division: string
  map: string
  description: string
  active: boolean
}

const divisions = [
  { _id: "Dhaka", name: "Dhaka" },
  { _id: "Chattogram", name: "Chattogram" },
  { _id: "Khulna", name: "Khulna" },
  { _id: "Rajshahi", name: "Rajshahi" },
  { _id: "Barisal", name: "Barisal" },
  { _id: "Sylhet", name: "Sylhet" },
  { _id: "Rangpur", name: "Rangpur" },
  { _id: "Mymensingh", name: "Mymensingh" }
]

const cities = [
  // Dhaka Division
  { _id: "Dhaka", name: "Dhaka", divisionId: "Dhaka" },
  { _id: "Gazipur", name: "Gazipur", divisionId: "Dhaka" },
  { _id: "Narayanganj", name: "Narayanganj", divisionId: "Dhaka" },

  // Chattogram Division
  { _id: "Chattogram", name: "Chattogram", divisionId: "Chattogram" },
  { _id: "Cox's Bazar", name: "Cox's Bazar", divisionId: "Chattogram" },
  { _id: "Comilla", name: "Comilla", divisionId: "Chattogram" },

  // Khulna Division
  { _id: "Khulna", name: "Khulna", divisionId: "Khulna" },
  { _id: "Jessore", name: "Jessore", divisionId: "Khulna" },
  { _id: "Satkhira", name: "Satkhira", divisionId: "Khulna" },

  // Rajshahi Division
  { _id: "Rajshahi", name: "Rajshahi", divisionId: "Rajshahi" },
  { _id: "Bogra", name: "Bogra", divisionId: "Rajshahi" },
  { _id: "Pabna", name: "Pabna", divisionId: "Rajshahi" },

  // Barisal Division
  { _id: "Barisal", name: "Barisal", divisionId: "Barisal" },
  { _id: "Bhola", name: "Bhola", divisionId: "Barisal" },
  { _id: "Patuakhali", name: "Patuakhali", divisionId: "Barisal" },

  // Sylhet Division
  { _id: "Sylhet", name: "Sylhet", divisionId: "Sylhet" },
  { _id: "Moulvibazar", name: "Moulvibazar", divisionId: "Sylhet" },
  { _id: "Sunamganj", name: "Sunamganj", divisionId: "Sylhet" },

  // Rangpur Division
  { _id: "Rangpur", name: "Rangpur", divisionId: "Rangpur" },
  { _id: "Dinajpur", name: "Dinajpur", divisionId: "Rangpur" },
  { _id: "Kurigram", name: "Kurigram", divisionId: "Rangpur" },

  // Mymensingh Division
  { _id: "Mymensingh", name: "Mymensingh", divisionId: "Mymensingh" },
  { _id: "Jamalpur", name: "Jamalpur", divisionId: "Mymensingh" },
  { _id: "Netrokona", name: "Netrokona", divisionId: "Mymensingh" }
]

const StoreLocatorContainer = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [filteredCities, setFilteredCities] = useState(cities)

  useEffect(() => {
    if (selectedDivision) {
      const divisionCities = cities.filter((city) => city.divisionId === selectedDivision)
      setFilteredCities(divisionCities)

      if (selectedCity && !divisionCities.some((city) => city._id === selectedCity)) {
        setSelectedCity("")
      }
    } else {
      setFilteredCities(cities)
    }
  }, [selectedDivision, selectedCity])

  const fetchStores = async () => {
    setLoading(true)
    try {
      let url = `${config.backend_url}/store`
      const params = new URLSearchParams()

      if (selectedDivision) params.append("division", selectedDivision)
      if (selectedCity) params.append("city", selectedCity)

      if (params.toString()) url += `?${params.toString()}`

      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        setStores(data?.data?.result)
      } else {
        console.error("Failed to fetch store")
        setStores([])
      }
    } catch (error) {
      console.error("Error fetching stores:", error)
      setStores([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Find a store</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled>Select Division</option>
            {divisions.map((division) => (
              <option key={division._id} value={division._id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full h-14 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="" disabled>Select City</option>
            {filteredCities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={fetchStores} className="h-14 bg-black hover:bg-black/80 text-white">
          Search
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {stores?.length > 0 ? (
            stores.map((store) => (
              <Card key={store._id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={store.image || "/placeholder.svg?height=200&width=400"}
                    alt={store.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold">{store?.name}</h3>
                  <div className="flex items-start gap-1 mb-2">
                    <MapPin className="h-4 w-4 text-[red] mt-1" />
                    <p>
                      {store?.city}, {store?.division}
                      {store?.country && `, ${store?.country}`}
                    </p>
                  </div>
                  {store?.description && (
                    <p className="text-[darkgray] mb-2 line-clamp-2">
                      {store?.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between flex-wrap">
                    {store.map && (
                      <a
                        href={store.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        View on Map
                      </a>
                    )}
                    {store?.phone && (
                      <p className="text-[darkgray] text-[blue] flex items-center gap-1">
                        <Phone size={15} /> <span>{store?.phone}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No stores found. Please try different search criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StoreLocatorContainer
