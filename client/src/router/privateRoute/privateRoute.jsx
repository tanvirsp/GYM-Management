/* eslint-disable react/prop-types */
import { Navigate, useLocation,  } from 'react-router-dom';
import UserStore from '../../store/UserStore';



const PrivateRoute = ({children}) => {
    const {isLogin} = UserStore();
 
    
    const location = useLocation();

    if(!isLogin()){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;