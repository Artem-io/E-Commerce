import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import { useEffect, useState } from "react";
import { getAllProducts } from "./api/ProductsService";
import Navbar from "./Components/Navbar";
import ProductsPage from "./Components/ProductsPage";
import Authentication from "./Components/Authentication";

function App() {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.content);
    } 
    catch (err) {console.log(err)}
  };
  useEffect(() => {fetchProducts()}, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
