// Create a dedicated API module for data fetching

import { config } from "@/config"

// Cache the promises to deduplicate requests
const cache = new Map()

export async function fetchHeaderData() {
  const cacheKey = "header-data"
    // Return cached data if available
    
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

    // Create a promise for the data fetch
  const dataPromise =await fetch(`${config.backend_url}/category`)
    .then((res) => res.json())
    .then((data) => {
      // Optional: set expiry time for cache
        setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000) // 5 minutes
        
      return data?.data?.result
    })

  // Store promise in cache
  cache.set(cacheKey, dataPromise)

  return dataPromise
}

export async function fetchFooterData() {
  const cacheKey = "footer-data"

  // Return cached data if available
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  // Create a promise for the data fetch
  const dataPromise = await fetch(`${config.backend_url}/address`)
    .then((res) => res.json())
    .then((data) => {
      // Optional: set expiry time for cache
        setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000) // 5 minutes

      return data?.data
    })
    const dataPromiseTwo = await fetch(`${config.backend_url}/social`)
    .then((res) => res.json())
    .then((data) => {
      // Optional: set expiry time for cache
      setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000) // 5 minutes
      return data?.data
    })

  // Store promise in cache
  cache.set(cacheKey, {address:dataPromise,social:dataPromiseTwo})

  return {address:dataPromise,social:dataPromiseTwo}
}

