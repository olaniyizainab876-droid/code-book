import { apiRequest } from "../config/Api";

export const getAdminproducts = async () => {
  return await apiRequest("/products");
};
export const createProduct = async (product) => {
  return await apiRequest("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const updateproduct = async (id, product) => {
  return await apiRequest(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id) => {
  return await apiRequest(`/products/${id}`, {
    method: "DELETE",
  });
};
