import React, { useEffect } from "react";
import CardComponent from "./CardComponent";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWishList } from "../redux/slices/WishListSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const wishlistData = wishlist?.data?.wishlist;
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishList())
    }
  }, [dispatch, isAuthenticated])

  return (
    <div className="w-full">
      <div className="flex justify-between w-full pb-[1.5rem] items-center">
        <h3 className="text-2xl font-bold text-[#111111]">Wishlist</h3>
      </div>
      <hr className="opacity-10" />

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-[1.5rem] gap-y-[1.875rem] lg:gap-y-[4.375rem] mt-[1.5rem]">
        {wishlistData?.length > 0 ? (
          wishlistData.map((wishlist, index) => (
            <CardComponent
              key={index}
              product={wishlist}
              isWishlistKey={true}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
