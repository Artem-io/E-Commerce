import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage'
import { useEffect, useState } from 'react'
import { getAllProducts } from './api/ProductsService';
import { Button } from '@mantine/core';

function App() 
{
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.content);
    }
    catch(err) {console.log(err)}
  }
  useEffect(() => {fetchProducts()}, []);

  return (
    <>
    {/* <Button onClick={()=>{console.log(products)}}>Hehe</Button> */}
    <Routes>
      <Route path='/' element={<HomePage products={products} />} />
    </Routes>
    </>
  )
}

export default App
