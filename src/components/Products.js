import React,{useEffect,useState} from 'react'
import {add} from '../store/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { status } from '../store/productsSlice';


function Products() {
const dispatch =  useDispatch()
  const {data:product, status:statuses} = useSelector( state => state.product)
  
  useEffect(() => {
    dispatch(fetchProducts())

    // const fetchProducts = async ()=>{
    //     const res = await fetch('https://fakestoreapi.com/products');
    //     const data = await res.json()
    //     console.log(data);
    //     setProducts(data)
        
    // }
    // fetchProducts()
  }, []);


const handleAdd = (product)=>{
    dispatch(add(product))
}

if (statuses === status.LOADING) {
  return <h2>Loading...</h2>
}

if (statuses === status.ERROR) {
return <h2>Something went wrong!</h2>}

    return  (
    <div className='productsWrapper'>
        
    {product.map((product)=>(
        <div className='card' key={product.id}>
            <img src={product.image} alt="" />
            <h4>{product.title} </h4>
            <h5>{product.price} </h5>
            <button onClick={()=> handleAdd(product)} className='btn'>Add to cart </button>
        </div>
    ))}
    </div>
  )
}

export default Products