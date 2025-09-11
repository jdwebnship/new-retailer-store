import { useState } from "react";

export default function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState([1000, 5000]);

  const handleMinChange = (e) => {
    const newMin = Math.min(+e.target.value, priceRange[1] - 500);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(+e.target.value, priceRange[0] + 500);
    setPriceRange([priceRange[0], newMax]);
  };

  return (
    <div className="w-full">
      {/* Slider container */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-5">
        {/* Filled range track */}
        <div
          className="absolute h-2 bg-black rounded-full"
          style={{
            left: `${(priceRange[0] / 10000) * 100}%`,
            right: `${100 - (priceRange[1] / 10000) * 100}%`,
          }}
        />
        {/* Min handle */}
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={priceRange[0]}
          onChange={handleMinChange}
          className="absolute top-[-0.3125rem] w-full bg-transparent appearance-none pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        {/* Max handle */}
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={priceRange[1]}
          onChange={handleMaxChange}
          className="absolute top-[-0.3125rem] w-full bg-transparent appearance-none pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* Price boxes */}
      <div className="flex justify-between gap-4">
        <div className="flex items-center justify-between w-1/2 border rounded-lg px-3 py-2">
          <span>₹</span>
          <span>{priceRange[0].toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between w-1/2 border rounded-lg px-3 py-2">
          <span>₹</span>
          <span>{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
