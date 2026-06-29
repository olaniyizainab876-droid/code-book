import { useEffect, useState } from "react";
import Productcard from "../../../components/elements/ProductCard";
import { toast } from "react-toastify";
import { getFeaturedList } from "../../../Services/productServices";
import { useCart } from "../../../context";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { cartList, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getFeaturedList();
        setProducts(data || []);
      } catch (error) {
        toast.error(error.message, {
          closeButton: true,
          position: "top-right",
        });
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline-offset-8 ">
        Featured Ebooks
      </h1>

      <div className="flex flex-wrap justify-center lg:flex-row ">
        {products.slice(0, 6).map((product) => (
          <Productcard
            key={product.id}
            product={product}
            cartList={cartList}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </section>
  );
};
