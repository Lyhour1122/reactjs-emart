import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Homepage from "./pages/home/Homepage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrolltop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import { Toaster } from "react-hot-toast";

import MyState from "./context/myState";
import { ProtectRouteForuser } from "./components/protectedRoute/ProtectRouteForuser";
import { ProtectRouteForadmin } from "./components/protectedRoute/ProtectRouteForadmin";
import AddProductPage from "./pages/admin/AddProductPage";
import CategoryPage from "./pages/category/CategoryPage";

function App() {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          {/* Pages WITH Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="allproduct" element={<AllProduct />} />
            <Route path="productinfo/:id" element={<ProductInfo />} />
            <Route path="cart" element={<CartPage />} />

            {/* ✅ User Dashboard (protected) */}
            <Route
              path="user-dashboard"
              element={
                <ProtectRouteForuser>
                  <UserDashboard />
                </ProtectRouteForuser>
              }
            />

            {/* ✅ Admin Dashboard (protected) */}
            <Route
              path="admin-dashboard"
              element={
                <ProtectRouteForadmin>
                  <AdminDashboard />
                </ProtectRouteForadmin>
              }
            />

            {/* ✅ Admin pages (protected) */}
            <Route
              path="add-product"
              element={
                <ProtectRouteForadmin>
                  <AddProductPage />
                </ProtectRouteForadmin>
              }
            />

            <Route
              path="update-product/:id"
              element={
                <ProtectRouteForadmin>
                  <UpdateProductPage />
                </ProtectRouteForadmin>
              }
            />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>

          {/* Pages WITHOUT Layout */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;
