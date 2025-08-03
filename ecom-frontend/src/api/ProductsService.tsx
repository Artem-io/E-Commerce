import axios from "axios";

axios.defaults.withCredentials = true;
const AUTH_URL = "http://localhost:8080/auth"
const PRODUCTS_URL = "http://localhost:8080/products"
const CART_URL = "http://localhost:8080/cart"
const ORDERS_URL = "http://localhost:8080/orders"

export async function login(credentials) {  
  await axios.post(`${AUTH_URL}/login`, credentials);
}

export async function register(credentials) {  
  await axios.post(`${AUTH_URL}/register`, credentials);
}

export async function getAllProducts(
  searchParam='',
  page=0, 
  size=15, 
  sortBy='name', 
  order='asc') {
  return await axios.get(`${PRODUCTS_URL}?name=${searchParam}&page=${page}&size=${size}&sort=${sortBy},${order}`
  );
}

export async function getProductById(id: number) {
  return await axios.get(`${PRODUCTS_URL}/${id}`);
}

export async function addProduct(product) {
  return await axios.post(PRODUCTS_URL, product, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

export async function updateProduct(product) {
  return await axios.put(PRODUCTS_URL, product, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
}

export async function deleteProduct(id: number) {
  return await axios.delete(`${PRODUCTS_URL}/${id}`, { withCredentials: true });
}

export async function getCart() {
  return await axios.get(CART_URL, {withCredentials: true});
}

export async function addToCart(productId: number) {
  return await axios.post(`${CART_URL}/${productId}`, {withCredentials: true});
}

export async function deleteFromCart(itemId: number) {
  return await axios.delete(`${CART_URL}/${itemId}`, {withCredentials: true});
}

export async function decrementItemQuantity(itemId: number) {
  return await axios.put(`${CART_URL}/${itemId}`, {withCredentials: true});
}

export async function placeOrder(cartId: number) {
  return await axios.post(`${ORDERS_URL}/${cartId}`, {withCredentials: true});
}

export async function getOrders() {
  return await axios.get(ORDERS_URL, {withCredentials: true});
}