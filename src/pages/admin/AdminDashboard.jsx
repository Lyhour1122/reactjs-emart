import React, { useContext, useMemo, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi2";

import MyContext from "../../context/myContext";
import ProductDetail from "../../components/admin/ProductDetail";
import OrderDetail from "../../components/admin/OrderDetail";
import UserDetail from "../../components/admin/UserDeatail";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("users")) || {};
  const { loading, getAllProduct, getorder, getAllUser } =
    useContext(MyContext);

  const [tabIndex, setTabIndex] = useState(0);

  const stats = useMemo(() => {
    return {
      totalProducts: Array.isArray(getAllProduct) ? getAllProduct.length : 0,
      totalOrders: Array.isArray(getorder) ? getorder.length : 0,
      totalUsers: Array.isArray(getAllUser) ? getAllUser.length : 0,
    };
  }, [getAllProduct, getorder, getAllUser]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl py-4 mb-6">
        <h1 className="text-center text-xl md:text-2xl font-bold text-blue-600">
          Admin Dashboard
        </h1>
      </div>

      {/* Profile */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <div className="flex flex-col items-center text-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin"
            className="w-20 h-20 rounded-full border border-blue-200"
          />
          <div className="text-blue-700 font-medium">
            <p className="text-base md:text-lg">
              <span className="font-bold">Name :</span> {user?.name || "—"}
            </p>
            <p className="text-base md:text-lg">
              <span className="font-bold">Email :</span> {user?.email || "—"}
            </p>
          </div>

          {loading && (
            <p className="text-sm text-gray-500 font-medium">Loading...</p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs selectedIndex={tabIndex} onSelect={(i) => setTabIndex(i)}>
        <TabList className="flex flex-wrap -m-3 justify-center text-center mb-10">
          {/* Total Products */}
          <Tab className="p-3 md:w-1/3 sm:w-1/2 w-full outline-none">
            <div
              onClick={() => setTabIndex(0)}
              className="cursor-pointer bg-blue-50 border border-blue-100 rounded-xl px-6 py-6 hover:bg-blue-100 transition"
            >
              <div className="flex flex-col items-center gap-3">
                <FiShoppingCart className="text-blue-600 text-3xl" />
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalProducts}
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  Total Products
                </p>
              </div>
            </div>
          </Tab>

          {/* Total Orders */}
          <Tab className="p-3 md:w-1/3 sm:w-1/2 w-full outline-none">
            <div
              onClick={() => setTabIndex(1)}
              className="cursor-pointer bg-blue-50 border border-blue-100 rounded-xl px-6 py-6 hover:bg-blue-100 transition"
            >
              <div className="flex flex-col items-center gap-3">
                <HiOutlineClipboardList className="text-blue-600 text-3xl" />
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalOrders}
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  Total Orders
                </p>
              </div>
            </div>
          </Tab>

          {/* Total Users */}
          <Tab className="p-3 md:w-1/3 sm:w-1/2 w-full outline-none">
            <div
              onClick={() => setTabIndex(2)}
              className="cursor-pointer bg-blue-50 border border-blue-100 rounded-xl px-6 py-6 hover:bg-blue-100 transition"
            >
              <div className="flex flex-col items-center gap-3">
                <HiOutlineUsers className="text-blue-600 text-3xl" />
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalUsers}
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  Total Users
                </p>
              </div>
            </div>
          </Tab>
        </TabList>

        {/* Products Tab */}
        <TabPanel>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-blue-600 font-bold text-lg">All Products</h2>
            <Link
              to="/add-product"
              className="bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-200 transition text-sm font-semibold"
            >
              Add Product
            </Link>
          </div>
          <ProductDetail />
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel>
          <h2 className="text-blue-600 font-bold text-lg mb-3">All Orders</h2>
          <OrderDetail />
        </TabPanel>

        {/* Users Tab */}
        <TabPanel>
          <h2 className="text-blue-600 font-bold text-lg mb-3">All Users</h2>
          <UserDetail />
        </TabPanel>
      </Tabs>
    </div>
  );
}
