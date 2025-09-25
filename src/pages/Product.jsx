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
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 🔹 NEW
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
    debounce((params, dispatch, search, onComplete) => {
      if (search) {
        // Don't fetch if we're already showing search results
        onComplete?.();
        return;
      }
      dispatch(fetchProducts(params))
        .then(() => onComplete?.())
        .catch(() => onComplete?.());
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    // If we have a search query, don't fetch regular products
    if (searchQuery) {
      return;
    }

    // Set loading state when filters change
    setIsFilterLoading(true);

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
    debouncedFetchProducts(requestParams, dispatch, searchQuery, () =>
      setIsFilterLoading(false)
    );
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

  // ... all your filter/state logic remains unchanged ...

  return (
    <div>
      <CommonHeader />
      <div className="mx-auto py-[3.125rem] lg:py-[100px] min-h-screen flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 px-4 sm:px-6 lg:px-10 xl:px-[4.6875rem]">
          {/* 🔹 Mobile Sidebar Drawer */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden transition-all duration-300">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/50 transition-all duration-300"
                onClick={() => setIsSidebarOpen(false)}
              />
              {/* Drawer */}
              <div className="relative bg-white w-72 max-w-full h-full p-5 shadow-lg overflow-y-auto transition-all duration-300">
                {/* Close Button */}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-4 right-4 cursor-pointer"
                >
                  <img src={cross} alt="Close" />
                </button>

                {/* 🔹 Your existing filter content copied here */}
                <div className="mt-10">
                  {/* reuse your desktop filter JSX here (Availability, Category, Price, etc.) */}
                  <div className="fillter">
                    <div
                      className={`${
                        hasActiveFilters ? "lg:col-span-2" : "hidden"
                      }`}
                    >
                      <div className="flex flex-col border-b mb-[1rem] xl:mb-[1.5rem] !text-left">
                        <div className="flex justify-between w-full">
                          <h4 className="text-lg font-bold uppercase text-[0.875rem]  ">
                            Filter By <span>({activeFilterCount})</span>
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
                            <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                              Search: {searchQuery}
                              <img
                                className="cursor-pointer"
                                src={cross}
                                alt="Clear search"
                                onClick={() => {
                                  const newParams = new URLSearchParams(
                                    searchParams
                                  );
                                  newParams.delete("search");
                                  setSearchParams(newParams);
                                }}
                              />
                            </span>
                          )}
                          {filters.in_stock && (
                            <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
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
                            <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                              Out of Stock
                              <img
                                className="cursor-pointer"
                                src={cross}
                                alt=""
                                onClick={() =>
                                  handleCheckboxChange("out_of_stock")
                                }
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
                                className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg"
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
                              className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg"
                            >
                              {size}
                              <img
                                className="cursor-pointer"
                                src={cross}
                                alt=""
                                onClick={() =>
                                  handleCheckboxChange("sizes", size)
                                }
                              />
                            </span>
                          ))}
                          {(filters.priceRange[0] > 0 ||
                            filters.priceRange[1] < 10000) && (
                            <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
                              ₹{filters.priceRange[0]} - ₹
                              {filters.priceRange[1]}
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
                    <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
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
                    <div className="mb-[1.5rem] text-start">
                      <h4 className="text-lg font-bold uppercase text-[0.875rem]   mb-[0.9375rem]">
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
                            onChange={() =>
                              handleCheckboxChange("out_of_stock")
                            }
                          />
                          <span className="ml-2">Out of Stock</span>
                        </label>
                      </div>
                    </div>
                    {loading ? (
                      <div className="flex items-center justify-center p-4 text-start">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div>
                    ) : categories.length > 0 ? (
                      <div className="mb-[1.5rem] text-start">
                        <h4 className="text-lg font-bold mb-[0.9375rem] uppercase text-[0.875rem]  ">
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
                                  checked={filters.categories.includes(
                                    category.name
                                  )}
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
                        <p className="text-sm text-gray-500">
                          No categories found
                        </p>
                      </div>
                    )}

                    {/* do not remove this below code */}
                    {/* {loading ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : uniqueSizes.length > 0 ? (
              <div className="mb-[1.5rem]">
                <h4 className="text-lg font-bold mb-[0.9375rem] uppercase text-[0.875rem]  ">
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
                    <div className="text-start">
                      <h4 className="text-lg font-bold uppercase text-[0.875rem]   mb-[0.9375rem]">
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
                                newParams.set(
                                  "min_price",
                                  newValue[0].toString()
                                );
                              } else {
                                newParams.delete("min_price");
                              }

                              if (newValue[1] < 10000) {
                                newParams.set(
                                  "max_price",
                                  newValue[1].toString()
                                );
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
                </div>
              </div>
            </div>
          )}

          {/* 🔹 Desktop Sidebar (unchanged) */}
          <div className="hidden lg:block lg:col-span-2 lg:sticky lg:self-start lg:top-[100px] text-left">
            <div className="fillter">
              <div
                className={`${hasActiveFilters ? "lg:col-span-2" : "hidden"}`}
              >
                <div className="flex flex-col border-b mb-[1rem] xl:mb-[1.5rem]">
                  <div className="flex justify-between w-full">
                    <h4 className="text-lg font-bold uppercase text-[0.875rem]  ">
                      Filter By <span>({activeFilterCount})</span>
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
                      <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
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
                      <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
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
                      <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
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
                          className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg"
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
                        className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg"
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
                      <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
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
                    <span className="bg-[#F8F8F8] text-sm text-[#111111] inline-flex items-center px-[0.9375rem] py-[0.375rem] gap-[0.375rem] rounded-lg">
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
                <h4 className="text-lg font-bold uppercase text-[0.875rem]   mb-[0.9375rem]">
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
                  <h4 className="text-lg font-bold mb-[0.9375rem] uppercase text-[0.875rem]  ">
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
                <h4 className="text-lg font-bold mb-[0.9375rem] uppercase text-[0.875rem]  ">
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
                <h4 className="text-lg font-bold uppercase text-[0.875rem]   mb-[0.9375rem]">
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
                    0;
                    handlePriceRangeChange(newRange);
                  }}
                />
              </div>
            </div>
          </div>

          {/* 🔹 Product List Section */}
          {/* your product grid/cards code here */}
          <div className="lg:col-span-10 lg:pl-[1.875rem]">
            <div className="flex flex-wrap gap-2 justify-between mb-[1.5rem] items-center">
              <select
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none"
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
              <div className="flex items-center gap-3">
                <span className="text-[#808080] uppercase text-sm">
                  {ProductLoading
                    ? "Loading..."
                    : pageForm &&
                      pageTo && (
                        <>
                          Showing {pageForm}-{pageTo} of {totalItems} results.
                        </>
                      )}
                </span>
                {/* 🔹 Mobile Filter Button */}
                <div className="lg:hidden flex justify-end">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="px-4 py-2 btn text-white rounded-lg inline-flex gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 8C20.5933 8 21.1734 7.82405 21.6667 7.49441C22.1601 7.16477 22.5446 6.69623 22.7716 6.14805C22.9987 5.59987 23.0581 4.99667 22.9424 4.41473C22.8266 3.83279 22.5409 3.29824 22.1213 2.87868C21.7018 2.45912 21.1672 2.1734 20.5853 2.05765C20.0033 1.94189 19.4001 2.0013 18.8519 2.22836C18.3038 2.45543 17.8352 2.83994 17.5056 3.33329C17.1759 3.82664 17 4.40666 17 5C17 5.79565 17.3161 6.55871 17.8787 7.12132C18.4413 7.68393 19.2044 8 20 8ZM20 4C20.1978 4 20.3911 4.05865 20.5556 4.16853C20.72 4.27841 20.8482 4.43459 20.9239 4.61732C20.9996 4.80004 21.0194 5.00111 20.9808 5.19509C20.9422 5.38907 20.847 5.56726 20.7071 5.70711C20.5673 5.84696 20.3891 5.9422 20.1951 5.98079C20.0011 6.01937 19.8 5.99957 19.6173 5.92388C19.4346 5.84819 19.2784 5.72002 19.1685 5.55557C19.0586 5.39112 19 5.19778 19 5C19 4.73478 19.1054 4.48043 19.2929 4.29289C19.4804 4.10536 19.7348 4 20 4ZM1 5C1 4.73478 1.10536 4.48043 1.29289 4.29289C1.48043 4.10536 1.73478 4 2 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5C15 5.26522 14.8946 5.51957 14.7071 5.70711C14.5196 5.89464 14.2652 6 14 6H2C1.73478 6 1.48043 5.89464 1.29289 5.70711C1.10536 5.51957 1 5.26522 1 5ZM8 9C7.38106 9.00174 6.7778 9.19488 6.27293 9.55294C5.76807 9.911 5.38631 10.4165 5.18 11H2C1.73478 11 1.48043 11.1054 1.29289 11.2929C1.10536 11.4804 1 11.7348 1 12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H5.18C5.36345 13.5189 5.68611 13.9773 6.11264 14.3251C6.53918 14.6729 7.05317 14.8966 7.59836 14.9718C8.14355 15.0471 8.69893 14.9709 9.20371 14.7516C9.70849 14.5323 10.1432 14.1784 10.4603 13.7286C10.7775 13.2788 10.9647 12.7504 11.0017 12.2013C11.0386 11.6522 10.9238 11.1035 10.6697 10.6153C10.4157 10.1271 10.0323 9.71812 9.5614 9.43323C9.09052 9.14833 8.55035 8.99846 8 9ZM8 13C7.80222 13 7.60888 12.9414 7.44443 12.8315C7.27998 12.7216 7.15181 12.5654 7.07612 12.3827C7.00043 12.2 6.98063 11.9989 7.01921 11.8049C7.0578 11.6109 7.15304 11.4327 7.29289 11.2929C7.43275 11.153 7.61093 11.0578 7.80491 11.0192C7.99889 10.9806 8.19996 11.0004 8.38268 11.0761C8.56541 11.1518 8.72159 11.28 8.83147 11.4444C8.94135 11.6089 9 11.8022 9 12C9 12.2652 8.89464 12.5196 8.70711 12.7071C8.51957 12.8946 8.26522 13 8 13ZM23 12C23 12.2652 22.8946 12.5196 22.7071 12.7071C22.5196 12.8946 22.2652 13 22 13H14C13.7348 13 13.4804 12.8946 13.2929 12.7071C13.1054 12.5196 13 12.2652 13 12C13 11.7348 13.1054 11.4804 13.2929 11.2929C13.4804 11.1054 13.7348 11 14 11H22C22.2652 11 22.5196 11.1054 22.7071 11.2929C22.8946 11.4804 23 11.7348 23 12ZM11 19C11 19.2652 10.8946 19.5196 10.7071 19.7071C10.5196 19.8946 10.2652 20 10 20H2C1.73478 20 1.48043 19.8946 1.29289 19.7071C1.10536 19.5196 1 19.2652 1 19C1 18.7348 1.10536 18.4804 1.29289 18.2929C1.48043 18.1054 1.73478 18 2 18H10C10.2652 18 10.5196 18.1054 10.7071 18.2929C10.8946 18.4804 11 18.7348 11 19ZM22 18H18.82C18.5841 17.3328 18.1199 16.7704 17.5095 16.4124C16.8991 16.0543 16.1818 15.9235 15.4843 16.0432C14.7868 16.1629 14.154 16.5253 13.6979 17.0663C13.2418 17.6074 12.9916 18.2923 12.9916 19C12.9916 19.7077 13.2418 20.3926 13.6979 20.9337C14.154 21.4747 14.7868 21.8371 15.4843 21.9568C16.1818 22.0765 16.8991 21.9457 17.5095 21.5876C18.1199 21.2296 18.5841 20.6672 18.82 20H22C22.2652 20 22.5196 19.8946 22.7071 19.7071C22.8946 19.5196 23 19.2652 23 19C23 18.7348 22.8946 18.4804 22.7071 18.2929C22.5196 18.1054 22.2652 18 22 18ZM16 20C15.8022 20 15.6089 19.9414 15.4444 19.8315C15.28 19.7216 15.1518 19.5654 15.0761 19.3827C15.0004 19.2 14.9806 18.9989 15.0192 18.8049C15.0578 18.6109 15.153 18.4327 15.2929 18.2929C15.4327 18.153 15.6109 18.0578 15.8049 18.0192C15.9989 17.9806 16.2 18.0004 16.3827 18.0761C16.5654 18.1518 16.7216 18.28 16.8315 18.4444C16.9414 18.6089 17 18.8022 17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {ProductLoading || isFilterLoading ? (
              <div className="flex items-center justify-center p-4 h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-y-[4.375rem]">
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
                  className="inline-flex gap-2 btn px-[1.5rem] py-[0.9375rem] rounded-lg text-base lg:text-lg font-medium focus:outline-none items-center mt-5"
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
                    containerClassName="flex items-center flex-wrap custom-pagination cursor-pointer"
                    pageClassName="px-2 py-1"
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
