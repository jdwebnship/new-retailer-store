import { ThemeProvider } from "../contexts/ThemeContext";

export default function PriceFilterSlider({ value = [1000, 5000], onChange }) {
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
      <div className="relative w-full h-2 md:h-1 bg-gray-200 rounded-full mb-5 sm:mb-3">
        <div
          className="absolute h-2 md:h-1 rounded-full"
          style={{
            left: `${(value[0] / 10000) * 100}%`,
            right: `${100 - (value[1] / 10000) * 100}%`,
            backgroundColor:
              ThemeProvider?.bottomFooterBackgroundColor || "#111111",
          }}
        />
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={value[0]}
          onChange={handleMinChange}
          className="
            absolute top-[-0.4rem] md:top-[-0.3rem] w-full bg-transparent appearance-none pointer-events-none
            touch-action-pan-y
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            md:[&::-webkit-slider-thumb]:h-3 md:[&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
            md:[&::-moz-range-thumb]:h-3 md:[&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black
            [&::-moz-range-thumb]:cursor-pointer
            z-[2]
          "
        />
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={value[1]}
          onChange={handleMaxChange}
          className="
            absolute top-[-0.4rem] md:top-[-0.3rem] w-full bg-transparent appearance-none pointer-events-none
            touch-action-pan-y
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
            md:[&::-webkit-slider-thumb]:h-3 md:[&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:pointer-events-auto
            [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
            md:[&::-moz-range-thumb]:h-3 md:[&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black
            [&::-moz-range-thumb]:cursor-pointer
            z-[3]
          "
        />
      </div>

      <div className="flex justify-between gap-6">
        <div className="flex items-center justify-between w-1/2 border rounded-lg px-3 py-3">
          <span className="mr-1">₹</span>
          <span>{value[0].toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between w-1/2 border rounded-lg px-3 py-3">
          <span className="mr-1">₹</span>
          <span>{value[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
