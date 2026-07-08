import React, { useEffect, useState } from 'react'
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getProducts,
  getUsers,
} from "../services/api"
import OrderForm from '../components/OrderForm'

const Orders = () => {

  const [customer ,setCustomer] = useState("")
  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("Pending")

  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])

  const [message, setMessage] = useState("")
  const [editId, setEditId] = useState(null)

  const handleGetOrders = async() => {
    const data  = await getOrders()
    console.log("Orders :",data );
    setOrders(data)
  }

  const handleGetProducts = async() => {
    const data = await getProducts()
    console.log("Products :",data );
    setProducts(data)
  }

  const handleGetUsers = async() => {
    const data = await getUsers()
    console.log("Users :",data );
    setUsers(data)
  }

  useEffect(()=>{
    handleGetOrders()
    handleGetProducts()
    handleGetUsers()
  }, [])

  return (
    <div>
      <OrderForm 
      users={users}
      products={products}
      customer={customer}
      setCustomer={setCustomer}
      product={product}
      setProduct={setProduct}

      quantity={quantity}
      setQuantity={setQuantity}
      price={price}
      setPrice={setPrice}
       />
    </div>
  )
}

export default Orders