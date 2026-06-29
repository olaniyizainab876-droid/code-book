import { useEffect, useState } from "react";
import { useTitle } from "../../hooks/useTitle";
import { toast } from "react-toastify";
import adminService from "../../Services/adminservices";
import { toastOption } from "../../config/utils";

const AdminProductForm = ({ product = null, onSuccess }) => {
  useTitle(
    product
      ? "Edit product - Admin - CodeBook"
      : "Add Product - Admin - CodeBook",
  );

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: "",
    poster: "",
    in_stock: true,
    best_seller: false,
    overview: "",
    long_description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        overview: product.overview || "",
        long_description: product.long_description || "",
        price: product.price || "",
        rating: product.rating || 5,
        poster: product.poster || "",
        size: product.size || "",
        inStock:
          product.in_stock !== undefined
            ? product.in_stock
            : product.inStock !== undefined
              ? product.inStock
              : true,
        bestSeller:
          product.best_seller !== undefined
            ? product.best_seller
            : product.bestSeller !== undefined
              ? product.bestSeller
              : true,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "Number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.name ||
        !formData.poster ||
        !formData.overview ||
        !formData.long_description ||
        !formData.size
      ) {
        toast.error("Please, FILL in all required fields", toastOption);
        setLoading(false);
        return;
      }

      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        size: parseFloat(formData.size),
      };

      if (product) {
        await adminService.updateEbook(product.id, dataToSubmit);
        toast.success("Product updated successfully", toastOption);
      } else {
        await adminService.createEbook(dataToSubmit);
        toast.success("Product created successfully", toastOption);
      }

      onSuccess();
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold dark:text-white mb-6">
        {product ? "Edit Product" : "Add new Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Product Name*
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Price ($)*
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Rating (1-5)
          </label>

          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Image Url *
          </label>

          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Short Overview
        </label>

        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
         size (MB) 
        </label>

        <input
        type="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Detailed Description
        </label>

        <textarea
          name="long_description"
          value={formData.long_description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
          required
        />

        
      </div>


      <div className="mt-4 flex gap-4">
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="in_stock"
            checked={formData.in_stock}
            onChange={handleChange}
            className="w-4 h-4"
          />
          In Stock
        </label>

        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="best_seller"
            checked={formData.best_seller}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Best Seller
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-70 transition"
      >
        {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AdminProductForm;
