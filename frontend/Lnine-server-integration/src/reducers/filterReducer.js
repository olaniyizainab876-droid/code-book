export const filterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PRODUCT_LIST":
      return { ...state, productList: payload.products };

    case "SORT_BY":
      return { ...state, sortBy: payload?.sortBy ?? payload };

    case "RATINGS":
      return { ...state, ratings: payload?.ratings ?? payload };

    case "BEST_SELLER_ONLY":
      return { ...state, bestSellerOnly: payload?.bestSellerOnly ?? payload };

    case "ONLY_IN_STOCK":
      return { ...state, onlyInStock: payload?.onlyInStock ?? payload };

    case "CLEAR_FILTER":
      return {
        ...state,
        onlyInStock: false,
        bestSellerOnly: false,
        sortBy: null,
        ratings: null,
      };

    default:
      return state;
  }
};
