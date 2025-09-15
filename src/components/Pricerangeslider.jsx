export default function PriceRangeSlider({ value = [1000, 5000], onChange }) {
  const handleMinChange = (e) => {
    const newMin = Math.min(+e.target.value, value[1] - 500);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(+e.target.value, value[0] + 500);
    onChange([value[0], newMax]);
  };

  return (
    <div className="w-full">
      {/* Slider container */}
      <div className="relative w-full h-1 bg-gray-200 rounded-full mb-[0.75rem]">
        {/* Filled range track */}
        <div
          className="absolute h-1 bg-black rounded-full"
          style={{
            left: `${(value[0] / 10000) * 100}%`,
            right: `${100 - (value[1] / 10000) * 100}%`,
          }}
        />
        {/* Min handle */}
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={value[0]}
          onChange={handleMinChange}
          className="absolute top-[-0.275rem] w-full bg-transparent appearance-none pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-[0.75rem] [&::-webkit-slider-thumb]:w-[0.75rem]
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
          value={value[1]}
          onChange={handleMaxChange}
          className="absolute top-[-0.275rem] w-full bg-transparent appearance-none pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-[0.75rem] [&::-webkit-slider-thumb]:w-[0.75rem]
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* Price boxes */}
      <div className="flex justify-between gap-4">
        <div className="flex items-center justify-center w-1/2 border rounded-lg px-3 py-2">
          <span className="mr-1">₹</span>
          <span>{value[0].toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-center w-1/2 border rounded-lg px-3 py-2">
          <span className="mr-1">₹</span>
          <span>{value[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
