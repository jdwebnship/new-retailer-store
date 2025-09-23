import { useNavigate } from "react-router-dom";

export function CardItem({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full relative before:content-[''] before:block before:float-left before:pt-[125%] after:content-[''] after:table after:clear-both bg-[#f2f2f2] rounded-[1.125rem] flex flex-col flex-shrink-0 overflow-hidden cursor-pointer"
      onClick={() =>
        navigate(`/shop?categories=${encodeURIComponent(item.name)}`)
      }
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full absolute top-0 left-0 object-contain rounded-[1.125rem]"
      />
      <div className="absolute bottom-0 category-title py-[1rem] 2xl:py-[1.5rem] rounded-lg rounded-t-none overflow-hidden left-0 right-0">
        <h3 className="text-lg font-bold text-[1.125rem] text-white">
          {item.name}
        </h3>
        {/* <p className="text-md text-gray-600">{item.price}</p> */}
      </div>
    </div>
  );
}
