import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

  let found = sessionStorage.getItem("user");
  found = JSON.parse(found);

  return found == null || found == {} ? <Navigate to="/login" /> : children
 
}

export default PrivateRoute