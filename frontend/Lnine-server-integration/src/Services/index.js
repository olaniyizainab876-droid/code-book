import adminService from "./adminservices";
import authService from "./authService";
import { cartService } from "./cartServices";
import dataService from "./dataServices";
import orderService from "./orderServices";
import { productServices } from "./productServices";

export const { getFeaturedList, getProduct, getProductList } = productServices;
export const { loginUser, logout, registerUser } = authService;
export const { checkLoginStatus, getUser } = dataService;
export const { createEbook, updateEbook, checkAdminStatus } = adminService;
export const { getUserCart, addToCartAPI, removeFromCartAPI, clearCartAPI } =
  cartService;
export const { placeOrder, getUserOrder, getUserOrders } = orderService;
