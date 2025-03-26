/* eslint-disable react/prop-types */
import { Navigate  } from 'react-router-dom';
import UserStore from '../../store/UserStore';




const AdminRoute = ({children}) => {
    const {Profile} = UserStore();
 
    if(Profile.role ==="admin"){
        return children;
    }
    return <Navigate to="/login"  />;

   
};

export default AdminRoute;