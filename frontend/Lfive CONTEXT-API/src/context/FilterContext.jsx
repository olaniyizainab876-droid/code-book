import {createContext,useContext,useReducer} from "react"
import {filterReducer} from "../reducers"
import ProductList from "../Components/Products/Productlist"

const filterInitialState ={
     ProductList:[],
     filteredProducts:[],
     sortBy:"",
     onlyInStock:false,
     bestSellerOnly:false,
     ratings:[],  
}

 const filterContext = createContext(filterInitialState);

 export const FilterProvider =({children}) =>{
     const [state,dispatch] =useReducer(filterReducer,filterInitialState)

     const setProductList =(products) =>{
          dispatch({
               type:"LOAD_PRODUCTS",
               payload:products
          });
     }

     const setSortBy =(sort) =>{
          dispatch({
               type:"SORT_BY",
               payload:sort
          })
     }
     const setOnlyInStock =(value) =>{
          dispatch({
               type:"FILTER_BY_STOCK",
               payload: value
          })
     }
     const setBestSellerOnly  =(value) => {
          dispatch({
               type:"FILTER_BY_BEST_SELLER",
               payload:value
          })
     }

     const setRatings =(retings) =>{
          dispatch({
               type:"FILTER_BY_RATINGS",
               payload:retings
          })
     }

     const clearFilters =() =>{
          dispatch({
               type:"CLEAR_FILTERS"
          })
     }

     const value ={
          ProductList:state.ProductList,
          setProductList,
          filteredProducts:state.filteredProducts,
          sortBy:state.sortBy,
          setSortBy,
          onlyInStock:state.onlyInStock,
          setOnlyInStock,
          bestSellerOnly:state.bestSellerOnly,
          setBestSellerOnly,
          ratings:state.ratings,
          setRatings,
          clearFilters

     }

     return <filterContext.Provider value={value}>
          {children}
     </filterContext.Provider>

     export const useFilter=() =>{
          const context =useContext (filterContext)
          if(!context) {
               throw new Error("usefilter must be use within filterProvider")
          }
     }
 }