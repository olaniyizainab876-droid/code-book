import {ORDER_ENDPOINTS,apiRequest} from "../config/Api";


const transformOrderData=(orderData)=>{
     return {
          ... orderData,
          id:orderData._id ||orderData.id,
          orderId:orderData._id ||orderData.orderId,
          amount_paid:orderData.amount_paid || orderData.amount_paid,
          createdAt:orderData.createdAt || orderData.created_at,
     };
}

const placeOrder=async (cartItems) => {
     try {
          const orderData=await apiRequest(ORDER_ENDPOINTS.PLACE_ORDER,{
               method:"POST",
               body:JSON.stringify({}),
          });

          return transformOrderData(orderData)
     } catch (error) {
          throw new Error(error.message || "failed to place order")
     }
}

const getUserOrder=async () =>{
     try {
          const orders =await apiRequest(ORDER_ENDPOINTS.GET_USER_ORDERS,{
               method:"GET"
          })
           return orders.map(transformOrderData);
     } catch (error) {
          if (error.message.includes("not found") || error.message.includes("order")) {
               return[];
          }
          throw new Error(error.message ||"Failed to fetch orders")
     }
}

const getUserOrders =async (orderId) =>{
     if(!orderId) {
          throw new Error("order id is required")
     }
     try{
          const orderData =await apiRequest(ORDER_ENDPOINTS.GET_USER_ORDERS(orderId),{
               method:"GET",
          });

          return transformOrderData(orderData)
     } catch (error){
          throw new Error(error.message || "Order not found")
     }
};

const orderService={
     placeOrder,
     getUserOrder,
     getUserOrders
}

export default orderService; 