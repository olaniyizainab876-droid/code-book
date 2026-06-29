import { apiRequest, EBOOK_ENDPOINTS } from "../config/Api";

const normaliseSearch = (value = "") => value.toString().trim().toLowerCase();

const matchesSearch = (product, searchTerm) => {
  const normalised = normaliseSearch(searchTerm);

  if (!normalised) {
    return true;
  }
  const haystack = [
    product.name,
    product.overview,
    product.longDescription || product.long_Description,
    product.price,
    product.id,
  ]
    .filter(Boolean)
    .map((entry) => normaliseSearch(entry))
    .join(" ");

  return haystack.includes(normalised);
};

/**
 * transform backend to match frontend format
 * handles both snake_case and camelcase fields names
 */

 export const transformProduct = (product) => {
  return {
    ...product,
    id: product.id || product._id,
    long_description: product.longDescription || product.long_description,
    in_stock:
      product.inStock !== undefined
        ? product.inStock
        : product.in_stock !== undefined
          ? product.in_stock
          : true,

    bestSeller:
      product.bestSeller !== undefined
        ? product.bestSeller
        : product.best_seller !== undefined
          ? product.best_seller
          : false,
  };
};

/**
 * get all product with optional filter
 * @param{string}searchterm
 * @returns{array} array of products
 */

export async function getProductList(searchTerm = "") {
  try {
    const products = await apiRequest(EBOOK_ENDPOINTS.GET_ALL_EBOOK, {
      method: "GET",
    });

    const transformedProduct = products.map(transformProduct);

    //client side flitering
    if (searchTerm) {
      return transformedProduct.filter((product) =>
        matchesSearch(product, searchTerm),
      );
    }
    return transformedProduct;
  } catch (error) {
    throw new Error(error.message || "failed to fetch products");
  }
}

/**
 * Get a single product
 * @param{string/number}id-product ID
 * @returns{object} product
 */

export const getProduct = async (id) => {
  try {
    const product = await apiRequest(EBOOK_ENDPOINTS.SINGLE_EBOOK(id), {
      method: "GET",
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return transformProduct(product);
  } catch (error) {
    throw new Error(error.message || "product not found");
  }
};

/**
 * Get featured products(best sellers)
 * @returns{array}Array of features product
 */

export const getFeaturedList = async () => {
  try {
    const products = await apiRequest(EBOOK_ENDPOINTS.GET_ALL_EBOOK, {
      method: "GET",
    });
    const featured = products
      .filter((product) => product.bestSeller === true)
      .map(transformProduct);
    return featured;
  } catch (error) {
    throw new Error(error.message || "failed to fetch featured product");
  }
};

export const productServices={
  getFeaturedList,
  getProduct,
  getProductList,
  transformProduct
}