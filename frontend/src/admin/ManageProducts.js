import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus, getProducts, deleteProduct } from "./ApiAdmin";
import Search from "../core/Search";


const ManageProducts = () => {
  const [products, setProducts] = useState([])

  const {user, token} = isAuthenticated(); 

  const destroy = productId =>{
    deleteProduct(productId, user._id, token).then(data =>{
      if(data.error){
        console.log(data.erro);
      }else{
        loadProducts(); 
      }
    })
  }
  
  const loadProducts = () =>{
    getProducts().then(data =>{
      if(data.error){
        console.log(data.error);
      }else{
        setProducts(data)
      }
    })
  }
  
  useEffect(()=>{
    loadProducts(); 
  },[])
  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Manage Products</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">{products.length}</h2>
          <hr/>
          <ul className="list-group">
              {products.map((p, i)=>{
                return <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>{p.name}</strong>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill">Update</span>
                  </Link>
                  <span onClick={()=>{ destroy(p._id)}} className="badge badge-danger bad-pill">Delete</span>
                </li>; 
              })}
            
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts