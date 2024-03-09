import { useEffect, useState } from "react";
import "./style.css"


export const Product = () => {
   const [products , setProducts] = useState([])
   const [page , setPage] = useState(1)
   const [count , setCount] = useState(0)
   const [loading , setLoading] = useState(false);
   const [err , setErr] = useState(null)

   async function fetchData(page){
    const skip = (page - 1) * 10;
    setLoading(true)

    try {
        
       const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`)

       if(!response.ok){
        throw new Error('Failed to fetch data')
       }
       const data = await response.json()
       setProducts([...products , ...data.products])
       setPage(page + 1)
       setCount(data.total)
      
        
    } catch (error) {
       setErr(error.message)
        
        
    }finally {
        setLoading(false);
     }
 
   }

   useEffect(()=>{
    fetchData(1)
       },[]);

       const loadMore = ()=>{
        fetchData(page)
       }

    const isDisabled = count <= products.length 
 
    
  return (
    
    <>
      <div className="container">
        <div className="product-container">
            {products.map((item)=>{
                return <div className="product" key={item.id}>
                    <img className="product-img" src={item.thumbnail} alt={item.title} />
                    <h3>{item.title}</h3>
                </div>
            })}
        </div>
        <button onClick={loadMore} className="btn" disabled={loading || isDisabled } >{loading ? "Loading..." : isDisabled ? "No Products" : "Load More"}</button>
        </div>
    </>
    
  )
}
