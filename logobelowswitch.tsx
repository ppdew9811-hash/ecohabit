import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Double Leaf Icon */}
      <div className={`relative ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Leaf */}
          <path
            d="M25 50 C25 30, 35 20, 45 25 C50 27, 48 35, 50 40 C48 45, 40 50, 25 50 Z"
            fill="#3CB371"
            className="drop-shadow-sm"
          />
          {/* Right Leaf */}
          <path
            d="M75 50 C75 30, 65 20, 55 25 C50 27, 52 35, 50 40 C52 45, 60 50, 75 50 Z"
            fill="#90EE90"
            className="drop-shadow-sm"
          />
          {/* Leaf Veins */}
          <path
            d="M45 25 Q47 32, 50 40"
            stroke="#2E8B57"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M55 25 Q53 32, 50 40"
            stroke="#2E8B57"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* EHA Text */}
      <span className={`font-bold ${textSizes[size]} text-primary`}>
        EHA
      </span>
    </div>
  )
}
