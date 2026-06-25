import { apiRequest } from "../config/Api";

export const getHome = async () => {
  return await apiRequest("/featured_products");
};
export const getHomeSider = async () => {
  return await apiRequest("/products?best_seller=true");
};

export const getAllproducts = async () => {
  return await apiRequest("/products");
};
