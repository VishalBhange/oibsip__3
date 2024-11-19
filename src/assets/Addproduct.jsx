import React, { useEffect, useState } from 'react'

function Addproduct() {
    const [name,setName]=useState("")
    const [company,setCompany]=useState("")
    const [price,setPrice]=useState("")
    const [qty,setQty]=useState("")
    function getdata()
    {
        fetch("http://localhost:3000/product").then((res)=>{
            res.json().then((res1)=>{
                console.log(res1)
                

            })
        })
    }
    useEffect(()=>{
        getdata()
    },[])

function addprod(e)
  {
    e.preventDefault()
    let p={name,company,price,qty}
        fetch("http://localhost:3000/product",{
            method:"post",
            headers:{
                "content-type":"application/json",
                "accept":"application/json"
            },
            body:JSON.stringify(p)
        }).then((res1)=>{
            res1.json().then((res2)=>{
                console.log(res2)
                getdata()
                
            })
        })
    }
  return (
    <div>
        <h2>Create New Products</h2>
        <form onSubmit={addprod}>

            <input type="text" placeholder='Enter product name' 
            value={name} onChange={(e)=>setName(e.target.value)} /><br /><br />
            <input type="text" placeholder='Enter product Company'
            value={company} onChange={(e)=>setCompany(e.target.value)} /><br /><br />
            <input type="text" placeholder='Enter product Price'
            value={price} onChange={(e)=>setPrice(e.target.value)} /><br /><br />
            <input type="text" placeholder='Enter product Quantity'
            value={qty} onChange={(e)=>setQty(e.target.value)} /><br /><br />
            <button type='submit'>Add Product</button>
            
        </form>
    </div>
  )
}


export default Addproduct;