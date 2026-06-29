import React, { useEffect, useState } from 'react'
import { useTitle } from '../../hooks/useTitle'
import { toast } from 'react-toastify'
import DashboardCard from './component/DashBoard.Card'
import DashboardEmpty from './component/DashboardEmpty'
import { getUserOrder } from '../../Services'
import { toastOption } from '../../config/utils'


const DashBoard = () => {
  const [orders,setOrders]=useState([]);
  const [Loading,setLoading]=useState(false)
  useTitle("Dashboard")

  useEffect(()=>{
    const fetchOrders=async () =>{
      try {
        setLoading(true)
        const orderData = await getUserOrder()
        setOrders(orderData || [])
      } catch (error) {
        toast.error(error.message || "unable to load orders",toastOption)
        setOrders([])
      } finally{
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])
  return (
   <main>
    <section>
      <p className='text-2xl text-center font-semibold dark:text-slate-100 my-10 underline-offset-8 underline'>
        My Dashboard
      </p>
    </section>
    <section>
      {
        Loading?
        (<div className='flex justify-center items-center py-10'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 '>

          </div>

        </div>):
        orders.length ?
        (
          <div>
            {orders.map((order)=>(
              <DashboardCard key={order.id} order={order}/>
            ))}
          </div>
        ):
        (
          <DashboardEmpty/>
        )
      }
    </section>
   </main>
  )
}

export default DashBoard
