import { Route, Routes } from "react-router-dom";
import { Homepage } from "../Pages";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import Productdetails from "../Pages/ProductDetails";
import AdminPage from "../Pages/admin/AdminPage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ProductList from "../Pages/Product/ProductList";
import DashBoard from "../Pages/Dashboard/DashBoard";
import Cartpage from "../Pages/Cart/Cartpage";
import Order from "../Components/Order/Order";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<Productdetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/order-summery" element={<Order/>} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
