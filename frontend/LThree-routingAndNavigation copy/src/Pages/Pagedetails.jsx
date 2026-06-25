import {effect,useState} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { Rating } from '../Components/Index';

const Productdetails = () => {
     const {id} = useParams();
     const [product,setproduct] = useState(null);
     const navigate = useNavigate();
     const [loading,setloading] = useState(true);

     useEffect(() =>{
          const sampleProducts = {
      10001: {
        id: 10001,
        name: "Basics To Advanced In React",
        price: 29,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "React is a JavaScript library for building user interfaces.",
        long_description: "React is a JavaScript library used to build interactive user interfaces. It's declarative, efficient, and component-based, making UI development predictable and scalable."
      },
      10004: {
        id: 10004,
        name: "The Complete Guide to Backend Development",
        price: 99,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "This guide walks you through everything you need to know to become a skilled backend developer.",
        long_description: "Backend development refers to the server-side of web development—the part you don't see but that powers everything behind the scenes."
      },
      10008: {
        id: 10008,
        name: "JavaScript Basics To Advance",
        price: 29,
        rating: 5,
        poster: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=40",
        in_stock: true,
        overview: "A comprehensive, hands-on program for learning JavaScript.",
        long_description: "JavaScript Basics to Advance is a complete journey through the JavaScript programming language."
      }
    };

    setProduct(sampleProducts[id] || null);
    setLoading(false);
     },[id]);

     if (loading) {
          return(
               <main className="mx-auto max-w-7xl px-4 py-12">
                    <div className="text-center">
                         <p className="dark:text-white">
                              Loading ......
                         </p>
                    </div>
               </main>
          )
     }
     if(!product){
          return(
               <main className="mx-auto max-w-7xl px-4 py-12">
                    <div className="text-center">
                         <p className="dark:text-white">
                              Product not found
                         </p>
                         <button
                         onClick={() => navigate("/products")} 
                         className="mt-4  hover:bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg">
                         Back to Products
                         </button>
                    </div>
               </main>
          )
     }

     return(
          <main className="mx-auto max-w-7xl px-6 py-12">
               <button onClick={()=>navigate('/products')}
                    className="mb-6 text-rose-600 hover:text-rose-700 transition">
                         &larr; Back to Products
                         </button>
                         <div className="flex flex-col row gap-8">
                              <div>
                              <img src={product.poster}
                               alt={product.name}
                                className="w-full rounded-lg shadow-lg"/>

                         </div>
                         <div>
                             <h1 className="text-3xl font-bold dark:text-white mb-4">
                                     {product.name}
                              </h1> 
                              <div className='mb-4'>
                                   <Rating rating={product.rating} />
                              </div>
                              <div className='mb-6'> 
                                   <p className="text-2xl font-semibold text-rose-600 dark:text-rose-500">
                                        ${product.price.toFixed(2)}
                                   </p>
                                   <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
                                        {product.in_stock ? "In Stock" : "Out of Stock"}
                                   </p>
                              </div>
                              <div className="mb-6">
                                   <h2 className="text-xl font-semibold dark:text-white mb-2">Overview</h2>
                                   <p className="text-gray-700 dark:text-gray-300">
                                        {product.overview}</p>
                              </div>
                              <div className="mb-6">
                                   <h3 className="text-lg font-semibold dark:text-white mb-2">Description</h3>
                                   <p className="text-gray-700 dark:text-gray-300">
                                        {product.long_description}
                                   </p>
                              </div>
                              <button disabled={!product.in_stock} className={`w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 rounded-lg transition ${!product.in_stock ? "cursor-not-allowed opacity-50" : ""}`}>
                                   {product.in_stock ? "Add to Cart" : "Out of Stock"}
                              </button>
                         </div>
                         </div>
          </main>
     )
}

export default Productdetails
  
    