/**
 * Api configuration 
 * CENTRALIZED Configuration for backend 
 */

import axios from "axios"

//getting base url



// //In development mood
const getBaseurl=() =>{
//      if(import.meta.env.DEV){
//           return '/api'
//      }

     return import.meta.env.VITE_API_BASE_URL ||'http://localhost:3001/api'
}

//Helper function to build the api endpoint 

const api=(path) =>{
     const base =getBaseurl()
     return base.endsWith('/')?`${base}${path}`:`${base}/${path}`
}


//User/Auth endpoints 
export const USER_ENDPOINTS = {
  REGISRER_USER: api("users/registerUser"),
  REGISRER_ADMIN: api("users/registerAdmin"),
  LOGIN:api('users/login'),
  LOGOUT:api('users/logout'),
  USER_PROFILE: api('users/getuserProfile'),
  LOGIN_STATUS:api('users/loginStatus')

};

//Ebook endpoints
export const EBOOK_ENDPOINTS={
     CREATE_EBOOK:api("ebook/createEbook"),
     SINGLE_EBOOK:api("ebook/singleEbook"),
     GET_ALL_EBOOK:api("ebook/getAllEbook"),
     UPDATE_EBOOK:api("ebook/updateEbook")
}

//Cart endpoints

export const CART_ENDPOINTS={
     ADD_TO_CART:api("cart/addToCart"),
     REMOVE_FROM_CART:api("cart/removeFromCart"),
    CLEAR_CART:api("cart/clearCart"),
     GET_USER_CART:api("cart/getUserCart"),
     

}

//Order endpoints 
export const ORDER_ENDPOINTS={
     PLACE_ORDER:api("Order/placeOrders"),
     GET_USER_ORDERS:api("Order/getUserOrders"),
     GET_USER_ID:api("order/getUsersById")
}


//API configuration for axios requests

export const API_CONFIG={
     withCredentials:true,//required for httponly cookies 
     headers:{
          'content-Type':'application/json'
     }
}
export const apiClient=axios.create(API_CONFIG)


//***
// *** helper function to make api requests 
//  */

export const apiRequest=async(URL,options={}) =>{
     const {method='GET'.body,headers,...rest} =options;

     const config={
          url,
          method,
          headers:{
               ...API_CONFIG.headers,
               ...headers,
          },
          ...rest,

     }

     if(body !==undefined){
          config.data=typeof body ==='string'?JSON.parse(body):body
     }

     try{
          const response=await apiClient.request(config)
     }catch (error) {
          if(axios.isAxiosError(error)){
               if (error.message){
                    const message=error.response.data?.message||`HTTP erroe! status:${error.response.status}`
               }

               if (error.request){
                    throw new Error('unable to conect to server.please make sure that the bacend server is running port')
               }
          }

          throw error
     }
}