import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { debounce } from "lodash";

const useProductFilters = () => {
  const resetPageOnClearRef = useRef(false);
  const { storeInfo } = useSelector((state) => state.storeInfo);
  const { product } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const dispatch = useDispatch();

  const categories = useMemo(
    () => storeInfo?.sub_category_list || [],
    [storeInfo?.sub_category_list]
  );

  // Initialize filters from URL params
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
    // sort_by: searchParams.get("sort_by") || "recently_added",
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
      // sort_by: searchParams.get("sort_by") || "recently_added",
    }));
  }, [searchParams]);

  // Get current page from URL
  const currentPage = useMemo(() => {
    const page = parseInt(searchParams.get("page"), 10);
    return isNaN(page) || page < 1 ? 0 : page - 1;
  }, [searchParams]);

  // Set default sort parameter if not present in URL
  useEffect(() => {
    if (!searchParams.get("sort_by")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sort_by", "recently_added");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Convert category names to IDs for API request
  const subcategoryIds = useMemo(() => {
    return filters.categories
      .map((catName) => {
        const category = categories.find((cat) => cat.name === catName);
        return category ? category.id : null;
      })
      .filter(Boolean);
  }, [filters.categories, categories]);

  // Debounced product fetching
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchProducts = useCallback(
    debounce((params, dispatch, search, onComplete) => {
      if (search) {
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
    if (searchQuery) {
      return;
    }

    setIsFilterLoading(true);
    let pageFromUrl = searchParams.get("page") || "1";

    if (resetPageOnClearRef.current) {
      pageFromUrl = "1";
      resetPageOnClearRef.current = false;
    }

    const requestParams = {
      page: parseInt(pageFromUrl, 10),
    };

    // const sortBy = searchParams.get("sort_by") || filters.sort_by;
    // if (sortBy) requestParams.sort_by = sortBy;
    if (subcategoryIds.length > 0)
      requestParams.sub_category = subcategoryIds.join(",");
    if (filters.priceRange[0] > 0)
      requestParams.min_price = filters.priceRange[0];
    if (filters.priceRange[1] < 10000)
      requestParams.max_price = filters.priceRange[1];
    if (filters.sizes.length > 0) requestParams.size = filters.sizes.join(",");
    if (filters.in_stock) requestParams.in_stock = "1";
    if (filters.out_of_stock) requestParams.out_of_stock = "1";

    const params = new URLSearchParams();
    params.set("page", pageFromUrl);

    if (filters.categories.length > 0) {
      params.set("categories", filters.categories.join(","));
    }
    if (filters.sizes.length > 0) {
      params.set("sizes", filters.sizes.join(","));
    }
    if (filters.priceRange[0] > 0) {
      params.set("min_price", filters.priceRange[0]);
    }
    if (filters.priceRange[1] < 10000) {
      params.set("max_price", filters.priceRange[1]);
    }
    if (filters.in_stock) params.set("in_stock", "true");
    if (filters.out_of_stock) params.set("out_of_stock", "true");
    // if (filters.sort_by) params.set("sort_by", filters.sort_by);

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
    filters.out_of_stock,
    filters.sort_by,
    dispatch,
    setSearchParams,
    searchQuery,
    debouncedFetchProducts,
  ]);

  // Handle pagination
  const handlePageClick = useCallback(
    (event) => {
      const newPage = event.selected + 1;
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filterType, value) => {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        const params = new URLSearchParams(searchParams);
        let shouldResetPage = false;

        if (filterType === "in_stock" || filterType === "out_of_stock") {
          newFilters[filterType] = !prevFilters[filterType];
          newFilters[filterType]
            ? params.set(filterType, "true")
            : params.delete(filterType);
          shouldResetPage = true;
        } else if (filterType === "categories") {
          const category = categories.find(
            (cat) => cat.id.toString() === value
          ) || { name: value };
          const categoryName = category.name;

          // Toggle category
          if (prevFilters.categories.includes(categoryName)) {
            newFilters.categories = prevFilters.categories.filter(
              (cat) => cat !== categoryName
            );
          } else {
            newFilters.categories = [...prevFilters.categories, categoryName];
          }

          // Update URL params
          if (newFilters.categories.length > 0) {
            params.set("categories", newFilters.categories.join(","));
          } else {
            params.delete("categories");
          }
          shouldResetPage = true;
        } else if (filterType === "sizes") {
          newFilters.sizes = prevFilters.sizes.includes(value)
            ? prevFilters.sizes.filter((s) => s !== value)
            : [...prevFilters.sizes, value];

          if (newFilters.sizes.length > 0) {
            params.set("sizes", newFilters.sizes.join(","));
          } else {
            params.delete("sizes");
          }
          shouldResetPage = true;
        } else if (filterType === "sort_by") {
          newFilters.sort_by = value;
          params.set("sort_by", value);
          shouldResetPage = true;
        }

        // Reset to page 1 when filters change
        if (shouldResetPage) {
          params.set("page", "1");
        }

        // Update URL with new params
        setSearchParams(params, { replace: true });
        resetPageOnClearRef.current = true;

        return newFilters;
      });
    },
    [categories, searchParams, setSearchParams]
  );

  // Handle price range change
  const handlePriceRangeChange = useCallback(
    (newRange) => {
      setFilters((prev) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        setSearchParams(params, { replace: true });

        return {
          ...prev,
          priceRange: newRange,
        };
      });
    },
    [searchParams, setSearchParams]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    resetPageOnClearRef.current = true;
    const newParams = new URLSearchParams();
    newParams.set("page", "1");
    // newParams.set("sort_by", "recently_added");
    setSearchParams(newParams, { replace: true });

    setFilters({
      in_stock: false,
      out_of_stock: false,
      categories: [],
      sizes: [],
      // sort_by: "recently_added",
      priceRange: [0, 10000],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchParams, dispatch]);

  // Process products based on filters
  const filteredProducts = useMemo(() => {
    const products =
      searchQuery && product?.data?.data
        ? product.data.data
        : product?.data?.products?.data || [];

    return products.filter((product) => {
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
  }, [product, searchQuery, filters, categories]);

  const paginationInfo = useMemo(
    () => ({
      totalPages:
        searchQuery && product?.data?.last_page
          ? product.data.last_page
          : product?.data?.products?.last_page || 1,
      totalItems:
        searchQuery && product?.data?.total
          ? product.data.total
          : product?.data?.products?.total || 0,
      pageFrom:
        searchQuery && product?.data?.from
          ? product.data.from
          : product?.data?.products?.from,
      pageTo:
        searchQuery && product?.data?.to
          ? product.data.to
          : product?.data?.products?.to,
    }),
    [product, searchQuery]
  );

  const hasActiveFilters = useMemo(
    () =>
      filters.in_stock ||
      filters.out_of_stock ||
      filters.categories.length > 0 ||
      filters.sizes.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 10000,
    [filters]
  );

  const activeFilterCount = useMemo(
    () =>
      (filters.in_stock ? 1 : 0) +
      (filters.out_of_stock ? 1 : 0) +
      filters.categories.length +
      filters.sizes.length +
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0) +
      (searchQuery ? 1 : 0),
    [filters, searchQuery]
  );

  return {
    filters,
    isFilterLoading,
    currentPage,
    categories,
    searchQuery,

    filteredProducts,
    ...paginationInfo,

    hasActiveFilters,
    activeFilterCount,

    handlePageClick,
    handleFilterChange,
    handlePriceRangeChange,
    clearAllFilters,
    setFilters,
    setSearchParams,
    searchParams,
  };
};

export default useProductFilters;
