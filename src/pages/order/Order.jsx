import Footer from "../../helpers/components/Footer";
import Header from "../../helpers/components/Header";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useCallback, memo } from "react";
import { getOrders } from "../../services/user/user";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import InvoiceDownload from "./InvoiceDownload";
import HTMLToPDF from "./Invoice";

const ProductImageGrid = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "8px",
});

const ProductImage = styled("div")({
  width: "60px",
  height: "60px",
  border: "1px solid #e5e7eb",
  borderRadius: "4px",
  overflow: "hidden",
  cursor: "pointer",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const MemoizedHeader = memo(({ isLoading }) => (
  <Header isLoading={isLoading} />
));
const MemoizedFooter = memo(({ isLoading }) => (
  <Footer isLoading={isLoading} />
));

const Order = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpen = (items, order) => {
    setSelectedItems(items);
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleTrackOrder = (orderId) => {
    console.log(`Tracking order: ${orderId}`);
  };

  const fetchOrders = useCallback(async (page) => {
    setProductsLoading(true);
    try {
      const data = await getOrders(page);
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      console.log(err);
    } finally {
      setProductsLoading(false);
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, fetchOrders]);

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <MemoizedHeader isLoading={pageLoading} />

      {pageLoading ? (
        <div className="py-20 h-screen animate-pulse">
          <div className="border-b-[2px] border-gray-100 w-full rounded-md overflow-hidden">
            <div className="grid grid-cols-2 md:px-20 px-4 border-b">
              <Box sx={{ py: 3, md: { px: 4 }, px: 4 }}>
                <Skeleton variant="text" width={80} height={20} />
              </Box>
              <Box sx={{ py: 3, md: { px: 4 }, px: 10 }}>
                <Skeleton variant="text" width={80} height={20} />
              </Box>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="py-20 h-full">
            {productsLoading ? (
              <div className="border-b-[2px] border-gray-100 w-full rounded-md overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 md:px-20 px-4 border-b"
                  >
                    <Box sx={{ py: 3, md: { px: 4 }, px: 4 }}>
                      <Skeleton variant="rectangular" width={120} height={60} />
                    </Box>
                    <Box sx={{ py: 3, md: { px: 4 }, px: 10 }}>
                      <Skeleton variant="text" width={80} height={20} />
                    </Box>
                  </div>
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 border rounded-md">
                <h2 className="text-xl font-medium mb-2">No orders found</h2>
                <p className="text-gray-500">
                  You haven't placed any orders yet.
                </p>
              </div>
            ) : (
              <div className="rounded-md overflow-hidden">
                <div className="border-gray-100 w-full rounded-md overflow-hidden">
                  <div className="flex md:px-20 px-4 border-b w-full">
                    <div className="py-3 w-1/2 md:px-4 text-xs font-semibold text-gray-400 uppercase">
                      Product
                    </div>
                    <div className="py-3 px-4 w-1/2 text-xs font-semibold text-gray-400 uppercase">
                      Status
                    </div>
                  </div>

                  {orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="grid md:px-20 px-5 grid-cols-2 border-b-[2px] border-gray-100"
                    >
                      <div className="py-7">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 4).map((item) => (
                            <div
                              key={`${order.orderId}-${item.variantId}`}
                              onClick={() => handleOpen(order.items, order)}
                              className="inline-block md:h-12 h-10 w-10 md:w-12 rounded-full ring-2 ring-white overflow-hidden bg-gray-100 cursor-pointer"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.productName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}

                          {order.items.length > 4 && (
                            <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-700 text-white text-xs font-medium  items-center justify-center">
                              +{order.items.length - 4}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="md:p-4 flex justify-between gap-2 items-center">
                        <span className="font-medium md:text-xs text-[8px] capitalize">
                          {order.orderStatus}
                        </span>
                        <HTMLToPDF
                          order={order}
                          className="bg-black hover:bg-black/90 text-white md:px-10 px-2 md:text-xs text-[7px] py-3 shadow-xl rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center py-3">
              <div className="flex gap-4 items-center">
                {pagination.hasPrev && (
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-4 py-2 hover:bg-gray-300 text-sm rounded"
                    disabled={productsLoading}
                  >
                    <MdKeyboardArrowLeft />
                  </button>
                )}
                <span className="text-sm text-gray-700">
                  {pagination.current} - {pagination.pages}
                </span>
                {pagination.hasNext && (
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 hover:bg-gray-300 text-sm rounded"
                    disabled={productsLoading}
                  >
                    <MdKeyboardArrowRight />
                  </button>
                )}
              </div>
            </div>
          )}

          <MemoizedFooter isLoading={pageLoading} />

          {/* Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 className="text-lg font-bold mb-4">
                Order #{selectedOrder?.orderNumber}
              </h2>
              <div className="space-y-4">
                {selectedItems?.map((item) => (
                  <div
                    key={`${selectedOrder?.orderId}-${item.variantId}`}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 border bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">
                          {item.productName} - {item.color}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          ₹ {(item.price / 100).toFixed(2)}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Size: {item.size}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="w-full bg-black text-white py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Order;
