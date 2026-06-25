import { apiRequest } from "../config/Api";

export const saveCart = async (email, cartData) => {
  try {
    return await apiRequest("/carts", {
      method: "POST",
      body: JSON.stringify({
        email,
        items: cartData.cartList,
        total: cartData.total,
        updatedAt: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("failed to save to cart :", error);
    throw error;
  }
};

export const getCart = async (email) => {
  try {
    const carts = await apiRequest(`/carts?email=${email}`);
    return cart[0] || null;
  } catch (error) {
    console.error("failed to retrieve cart :", error);
    throw error;
  }
};
