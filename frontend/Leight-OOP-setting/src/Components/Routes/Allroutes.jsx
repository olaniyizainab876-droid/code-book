import { Route, Routes } from "react-router-dom"
import { Homepage } from "../../Pages/Index"
import Login from "../../Pages/Login"
import Register from "../../Pages/Register"
import ProductList from "../Products/Productlist"
import Productdetails from "../../Pages/ProductDetails"
import AdminProtected from "./AdminProtectedRoute"
import { Cartpage } from "../Cart/Cartpage"
import AdminPage from "../../Pages/admin/AdminPage"
import AdminProtectedRoute from "./AdminProtectedRoute"

export const AllRoutes =() =>{

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<Productdetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Cart" element={<Cartpage />} />
      <Route 
      path="/admin" element={
        <AdminProtectedRoute>
          < AdminPage />
        </AdminProtectedRoute>
      }/>
    </Routes>
  );
}

export default AllRoutes
