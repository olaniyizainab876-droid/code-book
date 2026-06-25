import {usestate} from "react"
import {useNavigate} from  "react-router-dom"
import { useTitle } from "../../Hooks/useTitle"
import AdminProductForm from "../../Components/Routes/AdminProtected";
import AdminProductList from "../../Components/Routes/AdminProtected";
import {toast} from "react-toastify"

const AdminPage =() =>{
     useTitle("Admin Dashboard -codebook") 
     const navigate =useNavigate();
     const [activeTab,setActivetab] =usestate("products");
     const [editingProduct,setEditingProduct] =usestate(null);

     const handleLogout=() =>{
          localStorage.removeItem("adminUser")
          localStorage.removeItem("email")
          toast.success("logged out sucessfully")
          navigate("/login")
     }

     const handleAddProduct =(formData) =>{
          //In lesson 7,this will send to json-server API 
          const newProduct ={
               ...formData,
               id:Date.now() //temporary ID generATION 
          }
          toast.success("product added successfully ! (Demo mode,not saved to database")
          setEditingProduct(null)
     }
     const handleEditProduct =(product) =>{
          setEditingProduct(product)
          setActivetab("add")
          window.scrollTo({top:0,behavior})
     }

     const handleDeleteProduct=(Id) =>{
          //in lesson 7,this will  send delete request to j-son server API
          toast.success("product deleted successfully")
          console.log("would delete product",Id)
     }

     return (
          <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
               <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3-xl font-bold">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">logout</button>
               </div>
               <div className="mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-700">
                    <button onClick={()=>setActivetab("products")}
                         className={`px-4 py-2 font-semibold transititon ${activeTab === "product" ?"text-rose-600 border-b-2 border-rose-600"
                              :"text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                         }`}>
                         view product</button>

                    <button  onClick={() =>{setActivetab("add")
                         setEditingProduct(null)
                    }} className={`px-4 py-2 font-semibold transition ${activeTab === "add" ?"text-rose-600 border-b-2 border-rose-600":"text-gray-600 dark:hover:text-white"}`}>{editingProduct ?"Edit product":"Add product"}</button>
               </div>

               <div className="mt-8">
                    {activeTab === "products" ?(
                         <div> 
                              <h2 className="text-2xl font-bold dark:text-white mb-6">Manage Product</h2>
                              <AdminProductList onEdit={handleEditProduct} onDelete={handleDeleteProduct}/>
                              </div>
                    ):(
                         <div>
                              <AdminProductForm onSubmit={handleAddProduct} initialData={editingProduct}/>
                              </div>
                    )}

               </div> 
               <div className="mt-12 p-6 bg-59 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700 ">
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                    Admin features in this lesson 
                    </h3>
                    <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                         <li>
                              product admin routes (require adminUser flag in localStorage)</li>
                              <li>Product form of Validation</li>
                              <li>product list with edit/delete actions</li>
                              <li>Tab navigation between views </li>
                              <li>Demo mode-change not persisted (upgraded in lesson 7)</li>
                    </ul>
               </div>
               <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                         How to access the admin Dashboard
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-3">
                         To test the admin features:
                    </p>
                    <ol className="text-yellow-800 dark:text-yellow-200 text-sm space-y-2 ml-4 list-decimal">
                         <li>
                         open browser DevTools (f12)
                         </li>
                         <li>Go to console tab</li>
                         <li>RUn:<code className="bg-yellow-100  dark:bg-yellow-800 px-1 rounded">localStorage.setItem ('adminUser','true')</code></li>
                         <li>visit <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">/admin</code></li>
                         <li>You'll now see the admin Dashboard (use any email/password to login first)</li>
                    </ol>
               </div>
          </main>
     )
}