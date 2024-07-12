import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../api";
import { setOrders } from "../Context/actions/ordersAction";
import { motion } from "framer-motion";
import { buttonClick } from "../Animations";
import { utils, writeFile } from "xlsx";

const DBSalesReport = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const pdfRef = useRef();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const downloadPDF = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 30;
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );
  //     pdf.save("SalesReport.pdf");
  //   });
  // };

  const downloadExcel = () => {
    console.log(filteredOrders);
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(filteredOrders);

    utils.book_append_sheet(wb, ws, "SalesReport");

    writeFile(wb, "SalesReport.xlsx");
  };

  useEffect(() => {
    if (!orders?.length) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, [dispatch, orders]);

  const formatDate = (dateObject) => {
    if (dateObject && dateObject._seconds !== undefined) {
      const date = new Date(dateObject._seconds * 1000);
      return date.toLocaleDateString();
    }
    return "Invalid Date";
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredOrders = orders?.filter((order) => {
    const orderDate = new Date(order.date._seconds * 1000);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate && endDate) {
      return orderDate >= start && orderDate <= end;
    } else if (startDate) {
      return orderDate >= start;
    } else if (endDate) {
      return orderDate <= end;
    } else {
      return true;
    }
  });

  return (
    <div className="flex flex-col items-start justify-center mt-10">
      <div className="p-5 flex items-start justify-center">
        <motion.button
          {...buttonClick}
          className="h-10 w-48 bg-green-500 rounded-md"
          onClick={downloadExcel}
        >
          Download Sales Report
        </motion.button>
      </div>
      <div className="flex flex-row mb-5">
        <div className="mr-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <table className="table-auto w-full" ref={pdfRef}>
        <thead className="bg-gray-200 ">
          <tr className="border">
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{order.customer.name}</td>
                <td className="border px-4 py-2">
                  {order.shipping_details.address.line1},
                  {order.shipping_details.address.line2},
                  {order.shipping_details.address.city},
                  {order.shipping_details.address.pincode}
                </td>
                <td className="border px-4 py-2">{order.total}</td>
                <td className="border px-4 py-2">{formatDate(order.date)}</td>
                <td className="border px-4 py-2">
                  <span
                    className={
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="6">
                No orders available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DBSalesReport;
