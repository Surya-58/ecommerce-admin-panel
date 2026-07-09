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

  const [total, setTotal] = useState(0)

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

  useEffect(()=>{
    const selectedProduct = products.find(
      (item) => item.name === product
    )
    if (selectedProduct) {
      setPrice(selectedProduct.price)
    }
  },[product, products])

  useEffect(() =>{
    setTotal(Number(price) * Number(quantity))
  },[price,quantity])

  const handleAddOrder = async() =>{
    try {
      const order = {
        customer,
        product,
        quantity,
        price,
        total,
        status,
      }
      const data = await addOrder(order)
      console.log(data);

      setMessage("Order Added Successfully")
      handleGetOrders()

      setCustomer("")
      setProduct("")
      setPrice("")
      setQuantity("")
      setTotal("")
      setStatus("Pending")

    } catch (error) {
      console.log(error);      
    }
  }

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
      total={total}

      handleAddOrder={handleAddOrder}
       />
    </div>
  )
}

export default Orders