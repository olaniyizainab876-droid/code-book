import { Route, Routes } from "react-router-dom"
import { Homepage } from "../../Pages/Index"
import Login from "../../Pages/Login"
import Register from "../../Pages/Register"
import ProductList from "../Products/Productlist"
import Productdetails from "../../Pages/ProductDetails"
export const AllRoutes =() =>{

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<Productdetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AllRoutes
