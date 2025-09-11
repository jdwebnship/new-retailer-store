import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import CardComponent from "./CardComponent";

function SecondProductSection() {
  const products = [
    {
      productName: "Sample Product 1",
      price: "29.99",
      imageSrc:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      productName: "Sample Product 2",
      price: "49.99",
      imageSrc:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    },
    {
      productName: "Sample Product 3",
      price: "19.99",
      imageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div>
      <span>Explore</span>
      <span>New Trending</span>
      {products.map((product, index) => (
        <CardComponent
          key={index}
          productName={product.productName}
          price={product.price}
          imageSrc={product.imageSrc}
        />
      ))}
    </div>
  );
}
export default SecondProductSection;
