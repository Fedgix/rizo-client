import React, { useEffect, useState, useCallback } from "react";
import Header from "../../helpers/components/Header";
import Footer from "../../helpers/components/Footer";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { getProducts } from "../../services/user/user";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

const NewArrivel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchParams] = useSearchParams();

  const categoryFromRoute = searchParams.get("category");
  const [filters, setFilters] = useState({
    gender: null,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryFromRoute || null,
    }));
    setCurrentPage(1);
  }, [categoryFromRoute]);

  const buildQueryString = useCallback(() => {
    const queryParams = [];

    if (filters.gender) queryParams.push(`gender=${filters.gender}`);

    return queryParams.length > 0 ? `&${queryParams.join("&")}` : "";
  }, [filters]);

  const fetchProducts = useCallback(async (page, filterQuery = "") => {
    try {
      const data = await getProducts(page, filterQuery);
      setProducts(data.products);
      setTotalPages(data.pagination.pages);
      setTotalProducts(data.pagination.total);
      const initialColors = {};
      data.products.forEach((product) => {
        if (product.images?.length > 0) {
          initialColors[product.id] = product.images[0].color;
        }
      });
      setSelectedColors(initialColors);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const queryString = buildQueryString();
    fetchProducts(currentPage, queryString);
  }, [buildQueryString, currentPage, fetchProducts]);

  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const toggleDropdown = useCallback(
    (dropdown) => {
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    },
    [activeDropdown]
  );

  const handleFilterSelect = useCallback(
    (filterType, value) => {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
      setActiveDropdown(null);
      handleFilterChange();
    },
    [handleFilterChange]
  );

  const handlePriceChange = useCallback((e, type) => {
    setTempPriceFilters((prev) => ({ ...prev, [type]: e.target.value }));
  }, []);

  const handleColorSelect = useCallback((productId, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const clearFilters = useCallback(() => {
    setFilters({
      gender: null,
    });
    navigate("/shop");

    handleFilterChange();
  }, [handleFilterChange]);

  const getButtonClass = useCallback(
    (isDisabled) =>
      `text-xl rounded-full ${
        isDisabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"
      }`,
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <div className="animate-pulse">
          <Box sx={{ width: "100%", height: 80, bgcolor: "#f6f6f6" }} />
          <Box sx={{ width: "100%", height: 20, bgcolor: "#f6f6f6", my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Skeleton variant="text" width={200} height={40} animation="wave" />
          </Box>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[...Array(8)].map((_, index) => (
              <Box key={index} sx={{ p: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                />
                <Skeleton width="80%" animation="wave" sx={{ mt: 2 }} />
                <Skeleton width="60%" animation="wave" />
              </Box>
            ))}
          </div>
          <Box
            sx={{
              width: "15%",
              height: 56,
              bgcolor: "#f6f6f6",
              mx: "auto",
              my: 4,
            }}
          />
          <Box sx={{ width: "100%", height: 200, bgcolor: "#f6f6f6" }} />
        </div>
      ) : (
        <>
          <Header />
          <div className="h-20 poppins-thin flex justify-start text-xs items-center px-3 md:px-20 w-full bg-[#f6f6f6] flex-wrap py-2">
            {/* Gender Dropdown */}
            <p className="font-semibold md:text-base text-xs">FILTER:</p>

            <div className="dropdown relative   text-xs">
              <button
                onClick={() => toggleDropdown("gender")}
                className="dropdown-toggle   pl-2 md:pl-10 py-2 rounded   flex items-center md:min-w-[10px] min-w-[10px]"
              >
                {filters.gender || "Gender"}
                <svg
                  className={`w-4 h-4 md:ml-2 ml-1 transition-transform ${
                    activeDropdown === "gender" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "gender" && (
                <div className="dropdown-menu absolute bg-white mt-1 rounded shadow-lg border border-gray-200 z-10 w-full">
                  <button
                    onClick={() => handleFilterSelect("gender", "Male")}
                    className="block w-full text-left md:px-4 px-2 py-2 hover:bg-gray-100"
                  >
                    Male
                  </button>
                  <button
                    onClick={() => handleFilterSelect("gender", "Female")}
                    className="block w-full text-left md:px-4 px-2 py-2 hover:bg-gray-100"
                  >
                    Female
                  </button>
                  <button
                    onClick={() => handleFilterSelect("gender", "Unisex")}
                    className="block w-full text-left md:px-4 px-2 py-2 hover:bg-gray-100"
                  >
                    Unisex
                  </button>
                </div>
              )}
            </div>

            <div className="ml-auto flex gap-2  text-xs justify-center items-center">
              <p
                className={` font-semibold   ${
                  totalProducts === 0 ? "text-red-500" : "text-black"
                }`}
              >
                {totalProducts}: PRODUCTS
              </p>
              {filters.gender && (
                <button
                  onClick={clearFilters}
                  className=" text-red-500 font-semibold border px-2 py-1 rounded-md hover:text-gray-700 text-xs"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center text-center py-10 pb-20 px-4">
            <h2 className="text-3xl font-medium mb-8 poppins-medium text-[#484848]">
              New Arrivels
            </h2>

            <ProductGrid
              products={products}
              selectedColors={selectedColors}
              navigate={navigate}
              handleColorSelect={handleColorSelect}
              isLoading={isLoading}
            />

            {!isLoading && (
              <div className="md:h-14 md:py-3 md:px-4 py-3 px-4 text-xs bg-[#f6f6f6] mt-8 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={getButtonClass(currentPage === 1)}
                >
                  <MdKeyboardArrowLeft />
                </button>
                <span className="text-black font-bold">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={getButtonClass(currentPage === totalPages)}
                >
                  <MdKeyboardArrowRight className="" />
                </button>
              </div>
            )}
          </div>
          <Footer isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default NewArrivel;
