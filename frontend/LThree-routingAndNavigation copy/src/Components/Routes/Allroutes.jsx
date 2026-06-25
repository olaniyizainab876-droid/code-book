import { Route, Routes } from "react-router-dom";
import { Homepage } from "../../Pages/Index";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import Productlist from "../../../../Lfour custom hooks/src/Components/Product/ProductList";
import Productdetails from "../../../../Lfour custom hooks/src/Pages/ProductDetails";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products/:id" element={<Productdetails />} />
      <Route path="/products" element={<Productlist />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
