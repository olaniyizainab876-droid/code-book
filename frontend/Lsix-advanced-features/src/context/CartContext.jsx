import {createContext,useReducer,useEffect } from "react"
import {CartReducer} from "../reducers"
import { toast } from "react-toastify"

const CartInitialState ={
     CartList:[],
     total:0,
     loadiing:false
}
     const CartContext =createContext (CartInitialState)

     export const CartProvider =({children}) =>{

          const [state,dispatch] = useReducer(CartReducer,CartInitialState);

          //load cart from localstorage on mount 

          useEffect(() =>{
               const saved =localStorage.getItem('cart')

               if(saved) {
                    const {CartList,total} =JSON.parse(saved)

                    dispatch({
                         type:"LOAD_CART",
                         payload:{products,CartList,total}
                    },[])
               }
          })

          //save to localstorage  whenever the state changes 

          useEffect(() =>{
               localStorage.setItem(
                    "cart",
                    JSON.stringify({
                         CartList:state.CartList,
                         total:state.total,
                    }),
               );
          },[state.CartList,state.total])

          const addToCart =(product) =>{
               try{
                    //Set loading to true before starting the add to cart process
                    dispatch({type:"SET_LOADING",payload:true});


                    //Create a new cart list by adding  the new product  to the existing Cart list 
                    const newCartList =[...state.CartList,product];

                    //Create new total by adding the price  of the new product to the exisiting total
                    const newTotal =Number(
                         (state.total +Number(product.price || 0)).toFixed(2)
                    )

                    //update the Cart state with the new Cart list and total
                    dispatch({
                         type:"ADD_TO_CART",
                         payload:{
                              products:newCartList,
                              total:newTotal,
                         },
                    });
                    toast.success("Item added to cart!")
               } catch(error){
                    toast.error(error.message ||"failed to add item to cart.please try again later!!!")
                    console.log(error)
               } finally{
                    dispatch({type:"SET_LOADING", payload:false})
               }                 
          }

          const removeFromCart =(productId) =>{
               try{
                    dispatch({type:"SET_LOADING", payload:true}) 

                    const product =state.CartList.find(p =>p.id === productId)

                    if(product) {
                         const newCartList =state.CartList.filter(p => p.id !== productId)
                              const newTotal =Number((state.total -Number(product.price || 0)).toFixed(2)
                         ) 

                         dispatch({
                              type:"REMOVE_FROM_CART",
                              payload:{
                                   products:newCartList,
                                   total:newTotal,
                              }
                         })

                         toast.success("item removed from cart!")
                        
                    }
               }catch (error) {
                    toast.error(
                         error.message ||
                         "failed to remove item from cart,please try again later"
                    )

                    console.log(error)
               }finally{
                    dispatch({type:"SET_LOADING",payload:false})
               }
          }

          const ClearCart =() =>{
               try{
                    dispatch({type:"SET_LOADING",payload:true })
                    dispatch({
                         type:"CLEAR_CART",
                         payload:{
                              products:[],
                              total: 0,
                         }
                    })
                    toast.success("cart cleared successfully!!")
               } catch (error) {
                    toast.error(
                         error.message || "failed to clear cart.please try again later."
                    );
                    console.log(error)
               } finally{
                    dispatch({type:"SET_LOADING",payload:false})
               }
          }

          const value ={
               CartList:state.CartList,
               total:state.total,
               loadiing:state.loadiing,
               addToCart,
               removeFromCart,
               ClearCart
          }

          return(<CartContext.Provider value={value}>
               {children}
          </CartContext.Provider>)
     }
     export const useCart =() =>{
          const context =useContext(CartContext)

          if(!Context){
               throw new Error ("usecart must be used within a cartprovider")
          }
          return context
     }
     