"use client"

import { useState } from "react"

export function LogoImage() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
      {!imageError ? (
        <img
          src="/logo.png"
          alt="Rusty's Card Logo"
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="mb-1">📷</div>
            <div>Logo Here</div>
          </div>
        </div>
      )}
    </div>
  )
}
