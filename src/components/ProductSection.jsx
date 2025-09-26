import React, { useEffect } from "react";
import CardComponent from "./CardComponent";
import { useDispatch, useSelector } from "react-redux";
import { postNewArrivals } from "../redux/slices/newArrivalsSlice";
import ButtonLink from "./ButtonLink";
import Loader from "./Loader";

function ProductSection() {
  const dispatch = useDispatch();
  const { newArrivals, loading } = useSelector((state) => state.newArrivals);

  useEffect(() => {
    dispatch(postNewArrivals());
  }, [dispatch]);

  const products = (newArrivals?.products || []).filter(
    (product) => product.status === "active"
  );

  return (
    <div className="py-[3.125rem] lg:py-[100px]">
      <p className="uppercase">Explore</p>
      <h2 className="text-[2rem] lg:text-[2.625rem] font-bold mb-[1.25rem] lg:mb-[3.125rem]">
        New Trending
      </h2>
      <section className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[1.5rem] xl:gap-y-[4.375rem]">
              {products.map((product) => (
                <CardComponent key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-[30px] lg:mt-[3.125rem]">
              <ButtonLink to="/shop">Shop ALL New Trending</ButtonLink>
            </div>
          </>
        ) : (
          <p className="text-center opacity-50">No products found.</p>
        )}
      </section>
    </div>
  );
}
export default ProductSection;
