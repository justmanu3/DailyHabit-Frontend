import React, { useRef } from "react";
import { HiCurrencyRupee } from "react-icons/hi";
import logo from "../assets/Logo/logo.png";
import { buttonClick } from "../Animations";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoiceModal = ({ data, onClose }) => {
  const pdfRef = useRef();

  const downloadPDF = () =>{
    const input = pdfRef.current;
    html2canvas(input).then((canvas)=>{
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm','a4',true);
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth , pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2 ;
        const imgY = 30 ;
        pdf.addImage(imgData, 'PNG' , imgX , imgY , imgWidth * ratio, imgHeight * ratio);
        pdf.save('invoice.pdf')

    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div
        className="container w-3/4 h-auto p-6 bg-white rounded-2xl overflow-auto"
        ref={pdfRef}
      >
        <div className="flex items-end justify-between ">
          <img src={logo} alt="Company Logo" className="w-20 h-20" />

          <motion.button
          onClick={downloadPDF}
            {...buttonClick}
            className="bg-green-600 text-white rounded-md font-light text-sm hover:bg-green-800"
          >
            Download Invoice
          </motion.button>
        </div>

        <div className="flex items-center justify-end w-full mb-4 pt-5">
          <button
            className="flex items-center bg-red-600 rounded-full w-6 h-6 justify-center text-md font-bold text-white"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <h1 className="text-xl font-semibold mb-4">
          Invoice for Order : {data.orderId}
        </h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Item Name</th>
              <th className="border p-2 text-right">Price x Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.product_name}</td>
                <td className="border p-2 text-right flex items-center justify-end">
                  <HiCurrencyRupee className="text-lg text-black mr-1" />
                  {parseFloat(item.product_price).toFixed(2)} x {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Shipping Details</h2>
          <p>{data.shipping_details.name}</p>
          <p>
            {data.shipping_details.address?.line1}{" "}
            {data.shipping_details.address?.line2}{" "}
            {data.shipping_details.address?.city}{" "}
            {data.shipping_details.address?.state}{" "}
            {data.shipping_details.address?.postal_code}
          </p>
          <p>{data.customer.email}</p>
          <p>{data.customer.phone}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Total</h2>
          <p className="flex items-center justify-end">
            <HiCurrencyRupee className="text-lg text-black mr-1" />
            {data.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
