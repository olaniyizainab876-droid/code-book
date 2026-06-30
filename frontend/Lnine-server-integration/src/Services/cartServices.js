import { apiRequest, CART_ENDPOINTS } from "../config/Api";

const transformCartData = (cartData) => {
  const cartList = cartData.cartList || [];
  const total = Number(
    cartList.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2),
  );

  return {
    cartList,
    total,
  };
};

/**
 * Get user's cart
 * @returns {Promise<object} {cartlist,total}
 */

const getUserCart = async () => {
  try {
    const cartData = await apiRequest(CART_ENDPOINTS.GET_USER_CART, {
      method: "POST",
    });

    return transformCartData(cartData);
  } catch (error) {
    // If cart not found, return empty cart

    if (error.message.includes("not found")) {
      return { cartList: [], total: 0 };
    }
    throw new Error(error.message || "Failed to fetch cart");
  }
};

/**
 * Add product to cart
 * @param {object} product-product object with id
 * @returns {Promise<object} update cart data
 */

const addToCartAPI = async (product) => {
  if (!product || typeof product.id === "undefined") {
    throw new Error("Invalid product  ");
  }
  try {
    const cartData = await apiRequest(CART_ENDPOINTS.ADD_TO_CART, {
      method: "POST",
      body: JSON.stringify({ id: product.id }),
    });

    return transformCartData(cartData);
  } catch (error) {
    throw new Error(error.message || "failed to add item to cart");
  }
};

/**
 * remove product from cart
 * @param {object} product -product object with id
 * @returns {promise<object>} updated cart data
 */

const removeFromCartAPI = async (product) => {
  if (!product || typeof product.id === "undefined") {
    throw new Error("Invalid product");
  }
  try {
    const cartData = await apiRequest(CART_ENDPOINTS.REMOVE_FROM_CART, {
      method: "DELETE",
      body: JSON.stringify({ id: product.id }),
    });
    return transformCartData(cartData);
  } catch (error) {
    throw new Error(error.message || "failed to remove item from cart");
  }
};
/**
 * clear all items to cart
 * @returns {promise<object}
 */

const clearCartAPI = async () => {
  try {
    const cartData = await apiRequest(CART_ENDPOINTS.CLEAR_CART, {
      method: "DELETE",
    });

    return transformCartData(cartData);
  } catch (error) {
    throw new Error(error.message || "failed to clear cart");
  }
};

export const cartService = {
  getUserCart,
  addToCartAPI,
  removeFromCartAPI,
  clearCartAPI,
};
