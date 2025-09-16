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
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const categories = useMemo(
    () => storeInfo?.sub_category_list || [],
    [storeInfo?.sub_category_list]
  );
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    in_stock: searchParams.get("in_stock") === "true",
    out_of_stock: searchParams.get("out_of_stock") === "true",
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
    sort_by: searchParams.get("sort_by") || "recently_added",
  });

  // Update filters when URL parameters change
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      in_stock: searchParams.get("in_stock") === "true",
      out_of_stock: searchParams.get("out_of_stock") === "true",
      categories: searchParams.get("categories")
        ? searchParams.get("categories").split(",")
        : [],
      sizes: searchParams.get("sizes")
        ? searchParams.get("sizes").split(",")
        : [],
      priceRange: [
        searchParams.get("min_price")
          ? Number(searchParams.get("min_price"))
          : 0,
        searchParams.get("max_price")
          ? Number(searchParams.get("max_price"))
          : 10000,
      ],
      sort_by: searchParams.get("sort_by") || null,
    }));
  }, [searchParams]);

  const getPageFromUrl = useCallback(() => {
    const page = parseInt(searchParams.get("page"), 10);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [searchParams]);

  const currentPage = getPageFromUrl() - 1;

  // Set default sort parameter if not present in URL
  useEffect(() => {
    if (!searchParams.get("sort_by")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sort_by", "recently_added");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const subcategoryIds = useMemo(() => {
    return filters.categories
      .map((catName) => {
        const category = categories.find((cat) => cat.name === catName);
        return category ? category.id : null;
      })
      .filter(Boolean);
  }, [filters.categories, categories]);

  const debouncedFetchProducts = useCallback(
    debounce((params, dispatch, search) => {
      if (search) {
        // Don't fetch if we're already showing search results
        return;
      }
      dispatch(fetchProducts(params));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    // If we have a search query, don't fetch regular products
    if (searchQuery) {
      return;
    }

    // Use the same page value from URL to ensure consistency
    const pageFromUrl = searchParams.get("page") || "1";

    const requestParams = {
      page: parseInt(pageFromUrl, 10),
    };

    // Get sort_by from URL first, then fallback to filters state
    const sortBy = searchParams.get("sort_by") || filters.sort_by;

    if (sortBy) {
      requestParams.sort_by = sortBy;
    }

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
    if (filters.in_stock) {
      requestParams.in_stock = "1";
    }
    if (filters.out_of_stock) {
      requestParams.out_of_stock = "1";
    }

    const params = new URLSearchParams();

    // Set page parameter - use from URL params directly to ensure consistency
    params.set("page", pageFromUrl);

    // Set filter parameters
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
    if (filters.sort_by) {
      params.set("sort_by", filters.sort_by);
      // params.set("page", "1");
    }

    setSearchParams(params, { replace: true });
    debouncedFetchProducts(requestParams, dispatch, searchQuery);
  }, [
    searchParams,
    subcategoryIds,
    filters.categories,
    filters.sizes,
    filters.priceRange,
    filters.in_stock,
    filters.sort_by,
    filters.out_of_stock,
    dispatch,
    setSearchParams,
    searchQuery,
    debouncedFetchProducts,
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
    // Update filters state first
    let newFilters = {};
    if (filterType === "in_stock" || filterType === "out_of_stock") {
      newFilters = {
        ...filters,
        [filterType]: !filters[filterType],
      };
    } else if (filterType === "categories") {
      const category = categories.find((cat) => cat.id.toString() === value);
      const categoryName = category?.name || value;
      newFilters = {
        ...filters,
        categories: filters.categories.includes(categoryName)
          ? filters.categories.filter((cat) => cat !== categoryName)
          : [...filters.categories, categoryName],
      };
    } else if (filterType === "sizes") {
      newFilters = {
        ...filters,
        sizes: filters.sizes.includes(value)
          ? filters.sizes.filter((s) => s !== value)
          : [...filters.sizes, value],
      };
    } else if (filterType === "sort_by") {
      newFilters = {
        ...filters,
        sort_by: value,
      };
    }

    // Update filter state
    setFilters(newFilters);

    // Update URL parameters with page reset and new filters
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("search");
      newParams.set("page", "1");

      // Update URL with new filter values
      if (newFilters.categories.length > 0) {
        newParams.set("categories", newFilters.categories.join(","));
      } else {
        newParams.delete("categories");
      }

      if (newFilters.sizes.length > 0) {
        newParams.set("sizes", newFilters.sizes.join(","));
      } else {
        newParams.delete("sizes");
      }

      if (newFilters.in_stock) {
        newParams.set("in_stock", "true");
      } else {
        newParams.delete("in_stock");
      }

      if (newFilters.out_of_stock) {
        newParams.set("out_of_stock", "true");
      } else {
        newParams.delete("out_of_stock");
      }

      if (newFilters.sort_by) {
        newParams.set("sort_by", newFilters.sort_by);
      } else {
        newParams.delete("sort_by");
      }

      return newParams;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      in_stock: false,
      out_of_stock: false,
      categories: [],
      sizes: [],
      sort_by: "recently_added",
      priceRange: [0, 10000],
    });
    // Clear search, reset to page 1 and set default sort
    const newParams = new URLSearchParams();
    newParams.set("page", "1");
    newParams.set("sort_by", "recently_added");
    setSearchParams(newParams);
  };

  // Handle both regular products and search results
  const products =
    searchQuery && product?.data?.data
      ? product.data.data // Search results structure
      : product?.data?.products?.data || []; // Regular products structure

  const totalPages =
    searchQuery && product?.data?.last_page
      ? product.data.last_page
      : product?.data?.products?.last_page || 1;

  const totalItems =
    searchQuery && product?.data?.total
      ? product.data.total
      : product?.data?.products?.total || 0;

  const pageForm =
    searchQuery && product?.data?.from
      ? product.data.from
      : product?.data?.products?.from;

  const pageTo =
    searchQuery && product?.data?.to
      ? product.data.to
      : product?.data?.products?.to;

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
    // const sort_byMatch =
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
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="">
      <CommonHeader />
      <div className="mx-auto py-[3.125rem] lg:py-[100px] min-h-screen flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7.5 px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
          <div className="lg:col-span-2 sticky self-start top-[100px] text-left">
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
                  {searchQuery && (
                    <span className="bg-[#F8F8F8] text-sm inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                      Search: {searchQuery}
                      <img
                        className="cursor-pointer"
                        src={cross}
                        alt="Clear search"
                        onClick={() => {
                          const newParams = new URLSearchParams(searchParams);
                          newParams.delete("search");
                          setSearchParams(newParams);
                        }}
                      />
                    </span>
                  )}
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
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [0, 10000],
                          }));
                          // Reset to page 1 when clearing price range
                          setSearchParams((prev) => {
                            const newParams = new URLSearchParams(prev);
                            newParams.set("page", "1");
                            return newParams;
                          });
                        }}
                      />
                    </span>
                  )}
                  {/* {filters.sort_by && (
                    <span className="bg-[#F8F8F8] text-sm inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                      {filters.sort_by}
                      <img
                        className="cursor-pointer"
                        src={cross}
                        alt=""
                        onClick={() => handleCheckboxChange("sort_by", null)}
                      />
                    </span>
                  )} */}
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
                <div className="flex lg:flex-nowrap gap-5 lg:gap-[0.5rem] flex-col">
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
                onChange={(newRange) => {
                  const handlePriceRangeChange = (newValue) => {
                    // Update filter state first
                    const newFilters = {
                      ...filters,
                      priceRange: newValue,
                    };

                    setFilters(newFilters);

                    // Update URL parameters with page reset
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev);
                      newParams.delete("search");
                      newParams.set("page", "1"); // Reset to page 1 when price range changes

                      // Update price range in URL
                      if (newValue[0] > 0) {
                        newParams.set("min_price", newValue[0].toString());
                      } else {
                        newParams.delete("min_price");
                      }

                      if (newValue[1] < 10000) {
                        newParams.set("max_price", newValue[1].toString());
                      } else {
                        newParams.delete("max_price");
                      }
                      return newParams;
                    });
                  };
                  handlePriceRangeChange(newRange);
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-10 lg:pl-[1.875rem]">
            <div className="flex flex-wrap gap-2 justify-between mb-[1.5rem] items-center">
              <select
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.sort_by || ""}
                onChange={(e) => {
                  const sortValue = e.target.value || null;
                  handleCheckboxChange("sort_by", sortValue);
                }}
              >
                {/* <option value="">Sort By</option> */}
                <option value="recently_added">Recently Added</option>
                <option value="price_high_to_low">Price High To Low</option>
                <option value="price_low_to_high">Price Low To High</option>
              </select>
              <span className="text-[#808080] uppercase">
                {ProductLoading
                  ? "Loading..."
                  : pageForm &&
                    pageTo && (
                      <>
                        Showing {pageForm}-{pageTo} of {totalItems} results.
                      </>
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
                <div className="flex justify-center mt-[2.375rem] lg:mt-[4.375rem]">
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
