import React, { useEffect, useState } from 'react'
import UserForm from '../components/UserForm'
import UserTable from '../components/UserTable'
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from "../services/api"

const Users = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("Customer")

  const [users, setUsers] = useState([])
  const [message, setMessage] = useState("")
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState("")

  const filteredSearch = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleGetUsers = async() => {
    try {
      const data = await getUsers()
      setUsers(data)
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddUser = async() => {
    try {
      const user = {
        name,
        email,
        phone,
        role,
      }
      const data = await addUser(user)
      console.log(data);
      setMessage("User Added Successfully")
      handleGetUsers();

      setName("")
      setEmail("")
      setPhone("")
      setRole("")    
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone)
    setRole(user.role)
  }

  const handleUpdateUser = async() => {
    try {
      const user = {
        name,
        email,
        phone,
        role,
      }

      const data = await updateUser(editId, user)
      console.log(data);
      setMessage("User Updated Successfully")
      handleGetUsers()      
      setEditId(null)
      setName("")
      setEmail("")
      setPhone("")
      setRole("Customer")
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleDelete = async(id) => {
    try {
      const data = await deleteUser(id)
      console.log(data);
      setMessage("User Deleted Successfully")
      handleGetUsers()
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    handleGetUsers()
  },[])

  return (
    <div className='page'>
      <div className="container">
        <h1 className="title">User Manager</h1>

        <UserForm 
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        role={role}
        setRole={setRole}
        handleAddUser={handleAddUser}
        handleUpdateUser={handleUpdateUser}
        editId={editId}
        message={message}
        />

        <label className="label">Search User</label>
        <br/>

        <input 
        type="text" 
        className="input"
        placeholder='Search User'
        value={search}
        onChange={(e)=>setSearch(e.target.value)} />
        <br />

        <UserTable 
        users={filteredSearch}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
      </div>

    </div>
  )
}

export default Users