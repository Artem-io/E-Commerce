import axios from "axios";

const AUTH_URL = "http://localhost:8080/auth"
const PRODUCTS_URL = "http://localhost:8080/products"

// export async function login(credentials) {
//   return await axios.post(`${AUTH_URL}/login`, credentials);
// }

export async function getAllProducts() {
  return await axios.get(PRODUCTS_URL);
}

// export async function addProduct(jwt, assignment) {
//   return await axios.post(
//         PRODUCTS_URL,
//         {
//           "name": assignment.name,
//           "status": "SUBMITTED",
//           "githubURL": assignment.githubURL,
//           "branch": assignment.branch,
//           "reviewVideoURL": ""
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`
//           },
//         }
//       );
// }

// export async function deleteProduct(id, jwt) {
//   return await axios.delete(`${PRODUCTS_URL}/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//   );
// }