import { apiRequest, EBOOK_ENDPOINTS } from "../config/Api";
import { transformProduct } from "./productServices";
import { getUser } from "./index";
import { create } from "axios";

/**
 * normalize product data for api submission
 */

const normalisedProduct = (product) => {
  const {
    name,
    overview,
    long_description,
    longDescription,
    size,
    rating,
    poster,
    inStock,
    in_stock,
    bestSeller,
    best_seller,
    price,
  } = product;

  return {
    name: name?.trim() || "",
    overview: overview?.trim() || "",
    longDescription: longDescription?.trim() || "",
    rating: Number(rating),
    poster: poster?.trim() || "",
    size: Number(size),
    inStock: typeof inStock === "boolean" ? inStock : Boolean(in_stock),
    bestSeller:
      typeof bestSeller === "boolean" ? bestSeller : Boolean(best_seller),
    price: Number(price),
  };
};

/**
 * create a new product
 * @params{object} ebookData-product data
 * @returns{object}created ebook
 */

const createEbook = async (ebookData) => {
  try {
    const productData = normalisedProduct(ebookData);

    if (
      !productData.name ||
      !productData.overview ||
      !productData.longDescription
    ) {
      throw new Error("name,overviewand long description are required");
    }
    if (!productData.price || productData.price <= 0) {
      throw new Error("valid price is required");
    }
    if (
      !productData.rating ||
      productData.rating < 1 ||
      productData.rating > 5
    ) {
      throw new Error("rating must be between 1 and 5");
    }
    const createdProduct = await apiRequest(EBOOK_ENDPOINTS.CREATE_EBOOK, {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return transformProduct(createdProduct);
  } catch (error) {
    throw new Error(error.message || "failed to create product");
  }
};

/**
 * update an existing ebooks
 * @param{string number} id-product id
 * @param(object)ebookdata
 * @returns{object}updated product
 */

const updateEbook = async (id, ebookData) => {
  try {
    const productData = normalisedProduct(ebookData);
    const updatedEbook = await apiRequest(EBOOK_ENDPOINTS.UPDATE_EBOOK(id), {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return transformProduct(updatedEbook);
  } catch (error) {
    throw new Error(error.message || "failed  to update product");
  }
};

/**
 * check if user is an admin
 * @returns{promise(boolearn)}true or false
 */

const checkAdminStatus = async () => {
  try {
    const user = await getUser();
    return Boolean(user?.isAdmin);
  } catch (error) {
    return false;
  }
};
/**
 * delete an ebook
 * @params{string|number} id
 * @returns {promise<object>} dletetion response
 */

const adminservices = {
  createEbook,
  updateEbook,
  checkAdminStatus,
};

export default adminservices;
