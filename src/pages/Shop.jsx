import React from "react";
import CommonHeader from "../components/CommonHeader";
import { CardItem } from "../components/CardItem";

function Shop() {
  const cardItems = [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "Mountain Retreat",
      // price: "$299.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "Beach Villa",
      // price: "$399.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "City Loft",
      // price: "$199.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "Forest Cabin",
      // price: "$249.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "Mountain Retreat",
      // price: "$299.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "Mountain Retreat",
      // price: "$299.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "Mountain Retreat",
      // price: "$299.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=334.8&h=418&q=80",
      name: "Mountain Retreat",
      // price: "$299.99",
    },
  ];

  return (
    <div>
      <CommonHeader />
      <section className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-[3.125rem] lg:py-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5  gap-4">
          {cardItems.map((item, idx) => (
            <CardItem item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Shop;
