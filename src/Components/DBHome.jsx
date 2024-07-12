import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, getAllProducts, getAllUsers } from "../api";
import { setAllUserDetails } from "../Context/actions/allUserActions";
import { CChart } from "@coreui/react-chartjs";
import { setOrders } from "../Context/actions/ordersAction";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.allUser);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [allOrders, setAllOrders] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [orderDataByDate, setOrderDataByDate] = useState({
    labels: [],
    data: [],
  });
  const [sortMode, setSortMode] = useState("month");
  const [paidOrdersCount, setPaidOrdersCount] = useState();
  const [codOrdersCount, setCodOrdersCount] = useState(0);

  const formatDate = (dateObject) => {
    if (dateObject && dateObject._seconds !== undefined) {
      const date = new Date(dateObject._seconds * 1000);
      return date.toLocaleDateString();
    }
    return "Invalid Date";
  };

  const smoothies = products?.filter(
    (item) => item.product_category === "Smoothies"
  );
  const oatbowls = products?.filter(
    (item) => item.product_category === "Oat Bowls"
  );
  const bites = products?.filter((item) => item.product_category === "Bites");

  useEffect(() => {
    if (!products?.length) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
    setAllProducts(products?.length);
  }, [products, dispatch]);

  useEffect(() => {
    if (!users?.length) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
    setAllUsers(users?.length);
  }, [users, dispatch]);

  useEffect(() => {
    if (!orders?.length) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setAllOrders(orders?.length);

    if (orders?.length) {
      const totalEarnings = orders.reduce(
        (sum, order) => sum + order.amount,
        0
      );
      setEarnings(totalEarnings);
      processOrderDataByDate(orders);

      const paidCount = orders.filter(
        (order) => order.status === "paid"
      ).length;
      const codCount = orders.filter((order) => order.status === "COD").length;
      setPaidOrdersCount(paidCount);
      setCodOrdersCount(codCount);
    }
  }, [orders, sortMode]);

  const processOrderDataByDate = (orders) => {
    const orderCounts = {};
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    orders.forEach((order) => {
      const orderDate = new Date(order.date._seconds * 1000);

      if (sortMode === "month") {
        const month = orderDate.toLocaleString("default", { month: "long" });
        if (orderCounts[month]) {
          orderCounts[month]++;
        } else {
          orderCounts[month] = 1;
        }
      } else {
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        if (orderDate >= startOfMonth && orderDate <= endOfMonth) {
          const week = `Week ${Math.ceil(orderDate.getDate() / 7)}`;
          if (orderCounts[week]) {
            orderCounts[week]++;
          } else {
            orderCounts[week] = 1;
          }
        }
      }
    });

    const labels = Object.keys(orderCounts);
    const data = Object.values(orderCounts);

    setOrderDataByDate({ labels, data });
  };

  const handleSortChange = (mode) => {
    setSortMode(mode);
  };

  return (
    <>
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col items-center justify-center shadow-xl gap-2 w-56 h-28 mt-10 bg-emerald-400 hover:bg-emerald-600 rounded-xl">
          <p className="capitalize font-semibold text-xl text-white">
            Total Order
          </p>
          <p className="capitalize font-semibold text-3xl text-white">
            {allOrders}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center shadow-xl gap-2 w-56 h-28 mt-10 bg-sky-400 hover:bg-sky-600 rounded-xl">
          <p className="capitalize font-semibold text-xl text-white">
            Customers
          </p>
          <p className="capitalize font-semibold text-3xl text-white">
            {allUsers}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center shadow-xl gap-2 w-56 h-28 mt-10 bg-red-400 hover:bg-red-600 rounded-xl">
          <p className="capitalize font-semibold text-xl text-white">
            Total Products
          </p>
          <p className="capitalize font-semibold text-3xl text-white">
            {allProducts}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center shadow-xl gap-2 w-56 h-28 mt-10 bg-orange-400 hover:bg-orange-600 rounded-xl">
          <p className="capitalize font-semibold text-xl text-white">
            Earnings
          </p>
          <p className="capitalize font-semibold text-3xl text-white">
            ₹ {earnings.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="flex items-center justify-center">
            <div className="w-340 md:w-508">
              <div className="flex justify-between mb-4">
                <button
                  className={`py-2 px-4 rounded ${
                    sortMode === "month"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handleSortChange("month")}
                >
                  Sort by Month
                </button>
                <button
                  className={`py-2 px-4 rounded ${
                    sortMode === "week"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handleSortChange("week")}
                >
                  Sort by Week
                </button>
              </div>
              <CChart
                type="line"
                data={{
                  labels: orderDataByDate.labels,
                  datasets: [
                    {
                      label: "Orders By Date",
                      backgroundColor: "#f87979",
                      borderColor: "#f87979",
                      data: orderDataByDate.data,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "#3d2a22",
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "#e0e0e0",
                      },
                      ticks: {
                        color: "#3d2a22",
                      },
                    },
                    y: {
                      grid: {
                        color: "#e0e0e0",
                      },
                      ticks: {
                        color: "#3d2a22",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-275 md:w-460">
              <CChart
                type="doughnut"
                data={{
                  labels: ["Card Orders", "COD Orders "],
                  datasets: [
                    {
                      backgroundColor: ["#DD1B16", "#00D8FF", "#41B883"],
                      data: [paidOrdersCount, codOrdersCount],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: "#3d2a22",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DBHome;
