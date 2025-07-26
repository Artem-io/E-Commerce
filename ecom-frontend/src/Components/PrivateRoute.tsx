import { useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { validateToken } from '../api/ProductsService';

const PrivateRoute = ({children}) => 
  {
    const [isTokenValid, setIsTokenValid] = useState(false);
    
    const checkToken = async () => {
      try {
        const response = await validateToken();
        setIsTokenValid(response.data);
      } 
      catch (err) {
        console.error("Token validation failed: ", err);
        setIsTokenValid(false);
      }
    };
    useEffect(() => {checkToken()});

    if(!isTokenValid) return <Navigate to='/auth' />
    else return children;
}

export default PrivateRoute