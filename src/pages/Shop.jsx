import React from "react";
import CommonHeader from "../components/CommonHeader";
import { CardItem } from "../components/CardItem";
import { useSelector } from "react-redux";

function Shop() {
  const { storeInfo, loading } = useSelector((state) => state.storeInfo);

  const categories = storeInfo?.sub_category_list || [];

  return (
    <div>
      <CommonHeader />
      <section className="px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem] py-[3.125rem] lg:py-[100px]">
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-x-6 gap-y-7.5">
            {categories.map((item) => (
              <CardItem item={item} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-4">
            <p className="text-sm text-gray-500">No categories found</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;
