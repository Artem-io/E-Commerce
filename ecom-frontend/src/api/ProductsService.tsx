import axios from "axios";

axios.defaults.withCredentials = true;
const AUTH_URL = "http://localhost:8080/auth"
const PRODUCTS_URL = "http://localhost:8080/products"

export async function login(credentials) {  
  await axios.post(`${AUTH_URL}/login`, credentials);
}

export async function register(credentials) {  
  await axios.post(`${AUTH_URL}/register`, credentials);
}

export async function getAllProducts(
  searchParam: string='',
  page: number=0, 
  size: number=15, 
  sortBy: string='name', 
  order: string='asc') {
  return await axios.get(`${PRODUCTS_URL}?name=${searchParam}&page=${page}&size=${size}&sort=${sortBy},${order}`
  );
}

export async function addProduct(product) {
  return await axios.post(
        PRODUCTS_URL, product, {
          headers: {'Content-Type': 'multipart/form-data'},
          withCredentials: true
        }
      );
}

// export async function deleteProduct(id, jwt) {
//   return await axios.delete(`${PRODUCTS_URL}/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//   );
// }