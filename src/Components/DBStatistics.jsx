import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BestSellingProducts = () => {
  const orders = useSelector((state) => state.orders);
  const products = useSelector((state) => state.products);

  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    const calculateBestSellingProducts = () => {
      const productCount = {};

      orders?.forEach((order) => {
        order.items.forEach((item) => {
          const productId = item.productId;
          if (productCount[productId]) {
            productCount[productId]++;
          } else {
            productCount[productId] = 1;
          }
        });
      });

      const sortedProducts = Object.entries(productCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      const bestSellersWithDetails = sortedProducts.map(
        ([productId, count]) => {
          const product = products?.find(
            (product) => product.productId === productId
          );
          return {
            productId,
            count,
            productName: product ? product.product_name : "Unknown",
            productCategory: product ? product.product_category : "Unknown",
          };
        }
      );

      setBestSellingProducts(bestSellersWithDetails);
    };

    calculateBestSellingProducts();
  }, [orders, products]);

  return (
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">Top 3 Best Selling Products</h1>
      <table class="table-auto w-full text-left">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="px-4 py-2">Product ID</th>
            <th class="px-4 py-2">Product Name</th>
            <th class="px-4 py-2">Product Category</th>
            <th class="px-4 py-2">Number of Orders</th>
          </tr>
        </thead>
        <tbody>
          {bestSellingProducts.map(
            ({ productId, productName, productCategory, count }) => (
              <tr key={productId} class="border-b hover:bg-gray-100">
                <td class="px-4 py-2">{productId}</td>
                <td class="px-4 py-2">{productName}</td>
                <td class="px-4 py-2">{productCategory}</td>
                <td class="px-4 py-2">{count}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingProducts;
