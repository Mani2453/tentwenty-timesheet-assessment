'use client';

import React, { useState, useRef } from 'react';

interface ProgressBarProps {
  current: number;
  target: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  target,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;
  const isOvertime = current > target;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setTooltipPosition({ x, y });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setTooltipPosition({ x, y });
      setShowTooltip(true);
      
      // Auto-hide tooltip after 2 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
  };

  return (
    <div className={`w-[188px] h-[28px] ${className}`}>
      <div className="flex justify-end items-center mb-2">
        <span className={`text-sm font-medium ${
          isOvertime ? 'text-red-600' : 
          isComplete ? 'text-green-600' : 
          'text-gray-500'
        }`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="relative">
        <div 
          ref={progressBarRef}
          className="w-[188px] h-[6px] bg-gray-200 rounded-full h-3 cursor-pointer relative overflow-visible hover:bg-gray-300 transition-colors"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div 
            className={`h-[6px] rounded-full transition-all duration-300 ${
              isOvertime ? 'bg-red-500 hover:bg-red-600' :
              isComplete ? 'bg-green-500 hover:bg-green-600' :
              'bg-orange-500 hover:bg-orange-600'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
          
          {/* Custom Message Shape Tooltip */}
          {showTooltip && (
            <div 
              className="w-[90px] h-[42px] absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{ 
                left: `${tooltipPosition.x}px`, 
                top: `${tooltipPosition.y - 12}px` 
              }}
            >
              {/* Message Bubble */}
              <div className="relative">
                {/* Main Message Box */}
                <div className="w-fill bg-white text-gray-900 px-4 py-2 rounded text-sm font-medium shadow-sm whitespace-nowrap">
                  {current}/{target} hrs
                </div>
                
                {/* Message Tail/Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <svg width="12" height="6" viewBox="0 0 12 6" className="text-white">
                    <path d="M6 6L0 0h12z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isOvertime && (
        <p className="text-xs text-red-600 mt-1">
          +{(current - target).toFixed(1)} hrs overtime
        </p>
      )}
    </div>
  );
};