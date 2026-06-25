import { apiRequest } from "../config/Api";

export const getOrders = async () => {
  return await apiRequest("/orders");
};

export const getOrders = async (id) => {
  return await apiRequest(`/order/${id}`);
};

export const createOrder = async (order) => {
  return await apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify("/orders", {
      ...order,
      id: Date.now(),
      createAt: new Date().toISOString(),
    }),
  });
};

export const getOrdersByUser = async (emaill) => {
  return await apiRequest(`/orders?email=${emaill}`);
};
