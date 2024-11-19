import React, { useEffect, useState } from 'react'

function Getproducts() {
    const [prods,setProds]=useState([])
    const [name,setName]=useState("")
    const [company,setCompany]=useState("")
    const [price,setPrice]=useState("")
    const [qty,setQty]=useState("")
    const [id,setId]=useState(null)
    function getdata()
    {
        fetch("http://localhost:3000/product").then((res)=>{
            res.json().then((res1)=>{
                console.log(res1)
                setProds(res1)
                setName(res1[0].name)
                setCompany(res1[0].company)
                setPrice(res1[0].price)
                setQty(res1[0].qty)
                setId(res1[0].id)

            })
        })
    }
    function delprod(id){
        fetch(`http://localhost:3000/product/${id}`,{
            method:"delete",
           
            
        }).then((res1)=>{
            res1.json().then((res2)=>{
                console.log(res2)
                getdata()
                
            })
        })
    }
    useEffect(()=>{
        getdata()
    },[])

    function selectprod(item)
    {
        console.log(item)
        setId(item.id)
        setName(item.name)
        setCompany(item.company)
        setPrice(item.price)
        setQty(item.qty)
    }
    function editprod(e)
    {
        e.preventDefault()
        let p={name,company,price,qty,id}
        fetch(`http://localhost:3000/product/${id}`,{
            method:"put",
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
        <h1>All Products</h1>
        <table border={2}>
        <thead>
            <tr>
                <th>ID</th><th>NAME</th><th>COMPANY</th><th>PRICE</th><th>QUANTITY</th><th>UPDATE</th>
            </tr>
        </thead>
        <tbody>
           {
            prods.map((item,index)=>{
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.company}</td>
                        <td>{item.price}</td>
                        <td>{item.qty}</td>
                        <td>
                            <button onClick={()=>selectprod(item)}>Edit</button>
                            <button onClick={()=>delprod(item.id)}>Delete</button>
                        </td>

                    </tr>
                )
            })
           }

        </tbody>

        </table>
        <h3>Update Product</h3>
        <form onSubmit={editprod}>

            <input type="text" placeholder='Enter product name' 
            value={name} onChange={(e)=>setName(e.target.value)} /><br /><br />
            <input type="text" placeholder='Enter product Company'
            value={company} onChange={(e)=>setCompany(e.target.value)} /><br /><br />
            <input type="text" placeholder='Enter product Price'
            value={price} onChange={(e)=>setPrice(e.target.value)} /><br /><br />
            <input type="text" placeholder='Enter product Quantity'
            value={qty} onChange={(e)=>setQty(e.target.value)} /><br /><br />
            <button type='submit'>Edit Product</button>
            
        </form>
    </div>
  )
}

export default Getproducts