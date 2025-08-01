import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import { useEffect, useState } from "react";
import { getAllProducts } from "./api/ProductsService";
import Navbar from "./Components/Navbar";
import ProductsPage from "./Components/ProductsPage";
import Authentication from "./Components/Authentication";
import { useAuth } from "./Components/AuthContext";
import AddProduct from "./Components/AddProduct";
import { jwtDecode } from "jwt-decode";
import Cart from "./Components/Cart";
import EditProduct from "./Components/EditProduct";

function App() {
  const [products, setProducts] = useState(null);
  const { isAuth } = useAuth();
  const decoded = isAuth? jwtDecode(document.cookie) : { authorities: [] };

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

          <Route path="/" element={<HomePage products={products} onProductDeleted={fetchProducts} />} />
          <Route path="/products" element={<ProductsPage />} />

          <Route path="/add-product" element={decoded.authorities.find((role: string) => role === 'ROLE_ADMIN')? 
          <AddProduct onProductAdded={fetchProducts} /> : <Navigate to="/" />} />

          <Route path="/products/:id" element={decoded.authorities.find((role: string) => role === 'ROLE_ADMIN')? 
          <EditProduct onProductUpdated={fetchProducts} /> : <Navigate to="/" />} />

          <Route path="/auth" element={isAuth? <Navigate to="/" /> : <Authentication />} />
          <Route path="/cart" element={isAuth? <Cart /> : <Navigate to="/auth" />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
