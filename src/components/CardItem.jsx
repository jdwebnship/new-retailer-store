export function CardItem({ item }) {
  return (
    <div className="w-full bg-white rounded-[1.125rem] shadow-lg flex flex-col flex-shrink-0 overflow-hidden relative">
      <img
        src={item.image}
        alt={item.name}
        className="w-full object-cover rounded-[1.125rem]"
      />
      <div className="absolute bottom-0 category-title py-[1rem] lg:py-[2.125rem] rounded-lg rounded-t-none overflow-hidden left-0 right-0">
        <h3 className="text-lg font-bold text-[1.125rem] lg:text-[1.5rem] text-white">
          {item.name}
        </h3>
        {/* <p className="text-md text-gray-600">{item.price}</p> */}
      </div>
    </div>
  );
}
