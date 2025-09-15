import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import cross from "../assets/x.svg";
import CardComponent from "../components/CardComponent";
import PriceRangeSlider from "../components/Pricerangeslider";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";

function Product() {
  const { storeInfo, loading } = useSelector((state) => state.storeInfo);
  const { product, loading: ProductLoading } = useSelector(
    (state) => state.products
  );

  console.log("product", product);

  const categories = storeInfo?.sub_category_list || [];
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    in_stock:
      searchParams.get("in_stock") !== null
        ? searchParams.get("in_stock") === "true"
        : true,
    out_of_stock: searchParams.get("out_of_stock") === "true" || true,
    categories: searchParams.get("categories")
      ? searchParams.get("categories").split(",")
      : [],
    sizes: searchParams.get("sizes")
      ? searchParams.get("sizes").split(",")
      : [],
    priceRange: [
      searchParams.get("min_price") ? Number(searchParams.get("min_price")) : 0,
      searchParams.get("max_price")
        ? Number(searchParams.get("max_price"))
        : 10000,
    ],
  });

  const getPageFromUrl = useCallback(() => {
    const page = parseInt(searchParams.get("page"), 10);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const currentPage = getPageFromUrl() - 1;
  const currentPageNum = getPageFromUrl();

  const subcategoryIds = useMemo(() => {
    return filters.categories
      .map((catName) => {
        const category = categories.find((cat) => cat.name === catName);
        return category ? category.id : null;
      })
      .filter(Boolean);
  }, [filters.categories, categories]);

  const debouncedFetchProducts = useCallback(
    debounce((params, dispatch) => {
      dispatch(fetchProducts(params));
    }, 300),
    []
  );

  useEffect(() => {
    const requestParams = {
      page: currentPageNum,
    };

    if (subcategoryIds.length > 0) {
      requestParams.sub_category = subcategoryIds.join(",");
    }
    if (filters.priceRange[0] > 0) {
      requestParams.min_price = filters.priceRange[0];
    }
    if (filters.priceRange[1] < 10000) {
      requestParams.max_price = filters.priceRange[1];
    }
    if (filters.sizes.length > 0) {
      requestParams.size = filters.sizes.join(",");
    }
    if (!filters.in_stock) {
      requestParams.in_stock = "0";
    }
    if (!filters.out_of_stock) {
      requestParams.out_of_stock = "0";
    }

    const params = new URLSearchParams();
    params.set("page", currentPageNum.toString());
    // params.set("page", "1");
    if (filters.categories.length > 0) {
      params.set("categories", filters.categories.join(","));
      params.set("page", "1");
    }
    if (filters.sizes.length > 0) {
      params.set("sizes", filters.sizes.join(","));
      params.set("page", "1");
    }
    if (filters.priceRange[0] > 0) {
      params.set("min_price", filters.priceRange[0]);
      params.set("page", "1");
    }
    if (filters.priceRange[1] < 10000) {
      params.set("max_price", filters.priceRange[1]);
      params.set("page", "1");
    }
    if (filters.in_stock) {
      params.set("in_stock", "true");
      // params.set("page", "1");
    }
    if (filters.out_of_stock) {
      params.set("out_of_stock", "true");
      // params.set("page", "1");
    }

    setSearchParams(params, { replace: true });
    debouncedFetchProducts(requestParams, dispatch);
  }, [
    currentPageNum,
    subcategoryIds,
    filters.categories,
    filters.sizes,
    filters.priceRange,
    filters.in_stock,
    filters.out_of_stock,
    dispatch,
    setSearchParams,
  ]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    setSearchParams(
      (prev) => {
        prev.set("page", newPage.toString());
        return prev;
      },
      { replace: false }
    );
  };

  const handleCheckboxChange = (filterType, value) => {
    if (filterType === "in_stock" || filterType === "out_of_stock") {
      setFilters((prev) => ({
        ...prev,
        [filterType]: !prev[filterType],
      }));
    } else if (filterType === "categories") {
      const category = categories.find((cat) => cat.id.toString() === value);
      const categoryName = category?.name || value;
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.includes(categoryName)
          ? prev.categories.filter((cat) => cat !== categoryName)
          : [...prev.categories, categoryName],
      }));
    } else if (filterType === "sizes") {
      setFilters((prev) => ({
        ...prev,
        sizes: prev.sizes.includes(value)
          ? prev.sizes.filter((s) => s !== value)
          : [...prev.sizes, value],
      }));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      in_stock: false,
      out_of_stock: false,
      categories: [],
      sizes: [],
      priceRange: [0, 10000],
    });
    setSearchParams({ page: "1" });
  };

  const products = product?.data?.products?.data || [];
  const totalPages = product?.data?.products?.last_page || 1;
  const totalItems = product?.data?.products?.total || 0;
  const pageForm = product?.data?.products?.from;
  const pageTo = product?.data?.products?.to;

  const filteredProducts = products.filter((product) => {
    const in_stock = product.quantity > 0;
    const stockMatch =
      (filters.in_stock && in_stock) ||
      (filters.out_of_stock && !in_stock) ||
      (!filters.in_stock && !filters.out_of_stock);
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.some((categoryName) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category && category.id === product.sub_category_id;
      });
    const priceMatch =
      product.final_price >= filters.priceRange[0] &&
      product.final_price <= filters.priceRange[1];
    return stockMatch && categoryMatch && priceMatch;
  });

  // const uniqueSizes = [
  //   ...new Set(products.map((product) => product.size).filter(Boolean)),
  // ];
  const hasActiveFilters =
    filters.in_stock ||
    filters.out_of_stock ||
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000;

  const activeFilterCount =
    (filters.in_stock ? 1 : 0) +
    (filters.out_of_stock ? 1 : 0) +
    filters.categories.length +
    filters.sizes.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="">
      <CommonHeader />
      <div className="mx-auto py-[3.125rem] lg:py-[100px] min-h-screen flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7.5 px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
          <div className="lg:col-span-2 text-start filters">
            <div className={`${hasActiveFilters ? "lg:col-span-2" : "hidden"}`}>
              <div className="flex flex-col border-b mb-[1rem] xl:mb-[1.5rem]">
                <div className="flex justify-between w-full">
                  <h4 className="text-lg font-bold uppercase text-[0.875rem] text-[#111111]">
                    Filter By <span>{activeFilterCount}</span>
                  </h4>
                  <span
                    className="underline text-[0.875rem] cursor-pointer"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </span>
                </div>
                <div className="flex flex-wrap gap-[0.5rem] py-[1.5rem]">
                  {filters.in_stock && (
                    <span className="bg-[#F8F8F8] text-sm inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                      In stock
                      <img
                        className="cursor-pointer"
                        src={cross}
                        alt=""
                        onClick={() => handleCheckboxChange("in_stock")}
                      />
                    </span>
                  )}
                  {filters.out_of_stock && (
                    <span className="bg-[#F8F8F8] text-sm inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                      Out of Stock
                      <img
                        className="cursor-pointer"
                        src={cross}
                        alt=""
                        onClick={() => handleCheckboxChange("out_of_stock")}
                      />
                    </span>
                  )}
                  {filters.categories.map((categoryName) => {
                    const category = categories.find(
                      (cat) => cat.name === categoryName
                    );
                    if (!category) return null;
                    return (
                      <span
                        key={category.id}
                        className="bg-[#F8F8F8] text-sm inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg"
                      >
                        {categoryName}
                        <img
                          className="cursor-pointer"
                          src={cross}
                          alt=""
                          onClick={() =>
                            handleCheckboxChange(
                              "categories",
                              category.id.toString()
                            )
                          }
                        />
                      </span>
                    );
                  })}
                  {filters.sizes.map((size) => (
                    <span
                      key={size}
                      className="bg-[#F8F8F8] text-sm inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg"
                    >
                      {size}
                      <img
                        className="cursor-pointer"
                        src={cross}
                        alt=""
                        onClick={() => handleCheckboxChange("sizes", size)}
                      />
                    </span>
                  ))}
                  {(filters.priceRange[0] > 0 ||
                    filters.priceRange[1] < 10000) && (
                    <span className="bg-[#F8F8F8] text-sm inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                      ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                      <img
                        className="cursor-pointer"
                        src={cross}
                        alt=""
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [0, 10000],
                          }))
                        }
                      />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-[1.5rem]">
              <h4 className="text-lg font-bold uppercase text-[0.875rem] text-[#111111] mb-[0.9375rem]">
                Availability <span>(2)</span>
              </h4>
              <div className="flex flex-wrap gap-5 lg:gap-[0.5rem] flex-row lg:flex-col">
                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    checked={filters.in_stock}
                    onChange={() => handleCheckboxChange("in_stock")}
                  />
                  <span className="ml-2">In Stock</span>
                </label>
                <label className="flex items-center text-[0.875rem]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                    checked={filters.out_of_stock}
                    onChange={() => handleCheckboxChange("out_of_stock")}
                  />
                  <span className="ml-2">Out of Stock</span>
                </label>
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : categories.length > 0 ? (
              <div className="mb-[1.5rem]">
                <h4 className="text-lg font-bold mb-[0.9375rem] uppercase text-[0.875rem] text-[#111111]">
                  Category <span>({categories.length})</span>
                </h4>
                <div className="flex lg:flex-nowrap flex-wrap gap-5 lg:gap-[0.5rem] flex-row lg:flex-col max-h-[30rem] overflow-y-auto">
                  {categories.map((category) => {
                    const name = category?.name || "Unnamed";
                    return (
                      <label
                        key={category.id || name}
                        className="flex items-center text-[0.875rem]"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                          checked={filters.categories.includes(category.name)}
                          onChange={() =>
                            handleCheckboxChange(
                              "categories",
                              category.id.toString()
                            )
                          }
                        />
                        <span className="ml-2">{name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4">
                <p className="text-sm text-gray-500">No categories found</p>
              </div>
            )}

            {/* do not remove this below code */}
            {/* {loading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : uniqueSizes.length > 0 ? (
              <div className="mb-[1.5rem]">
                <h4 className="text-lg font-bold mb-[0.9375rem] uppercase text-[0.875rem] text-[#111111]">
                  Size <span>({uniqueSizes.length})</span>
                </h4>
                <div className="flex flex-wrap gap-5 lg:gap-[0.5rem] flex-row lg:flex-col">
                  {uniqueSizes.map((size) => (
                    <label
                      key={size}
                      className="flex items-center text-[0.875rem]"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-transparent focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none custom-checkbox"
                        checked={filters.sizes?.includes(size)}
                        onChange={() => handleCheckboxChange("sizes", size)}
                      />
                      <span className="ml-2">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4">
                <p className="text-sm text-gray-500">No sizes found</p>
              </div>
            )} */}
            <div>
              <h4 className="text-lg font-bold uppercase text-[0.875rem] text-[#111111] mb-[0.9375rem]">
                Price
              </h4>
              <PriceRangeSlider
                value={filters.priceRange}
                onChange={(newRange) =>
                  setFilters((prev) => ({ ...prev, priceRange: newRange }))
                }
              />
            </div>
          </div>

          <div className="lg:col-span-10 lg:pl-[1.875rem]">
            <div className="flex flex-wrap gap-2 justify-between mb-[1.5rem]">
              <select className="uppercase">
                <option className="uppercase">Sort By</option>
                <option value="in_stock">In Stock</option>
              </select>
              <span className="text-[#808080] uppercase">
                {ProductLoading ? (
                  "Loading..."
                ) : pageForm && pageTo ? (
                  <>
                    Showing {pageForm}-{pageTo} of {totalItems}
                  </>
                ) : (
                  "No products found"
                )}
              </span>
            </div>
            {ProductLoading ? (
              <div className="flex items-center justify-center p-4 h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-7.5 md:gap-y-[4.375rem]">
                {filteredProducts.map((product) => (
                  <CardComponent key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-8 h-screen">
                <p className="text-lg text-gray-600">
                  No products match the selected filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-sm font-medium focus:outline-none items-center mt-5"
                >
                  Clear all filters
                </button>
              </div>
            )}
            {filteredProducts.length > 0 && (
              <div className="mt-auto">
                <div className="flex justify-center my-8">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPages}
                    previousLabel=""
                    renderOnZeroPageCount={null}
                    containerClassName="flex items-center flex-wrap sm:gap-2 custom-pagination cursor-pointer"
                    pageClassName="px-3 py-1"
                    pageLinkClassName="block w-full h-full"
                    previousClassName="px-2 cursor-pointer"
                    nextClassName="px-2 cursor-pointer"
                    previousLinkClassName=""
                    nextLinkClassName=""
                    activeClassName="border-b"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    forcePage={currentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
