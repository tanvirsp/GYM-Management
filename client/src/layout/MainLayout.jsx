/* eslint-disable no-unused-vars */
import { Link,  Outlet, useNavigate } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import avater from '../assets/images/avater.jpg';
import toast, { Toaster } from 'react-hot-toast';


import { useState } from 'react';
// import UserStore from '../store/UserStore';
import { useEffect } from 'react';

import { Dropdown } from 'bootstrap';
import NavItems from './NavItems';






const MainLayout = () => {
    // const {Profile, ProfileRequest, LogoutRequest} = UserStore();
    const navigate = useNavigate()

    const [showSideBar, setShowSideBar] = useState(true);
    const toggleSidebar = ()=>setShowSideBar(!showSideBar);

    useEffect(()=>{
        (async()=>{
            // Profile === null && await ProfileRequest()


        })()
    },[])
    


    const handleLogout = async()=>{
        // const result = await LogoutRequest();
        // if(result.status ==="success"){
        //   sessionStorage.clear();
        //   localStorage.clear();
        //   navigate("/");
        //   toast.success("Logout Successfully");
        
    }




   


    


    return (
        <>
            <section>
                <nav className={showSideBar ? "side-nav-open ": "side-nav-close "}>
                    <NavItems />
                </nav>

                <div className={showSideBar ? "content ": "content-expand "}>
                    <div className='top-bar'>
                        <div>
                            <FaBarsStaggered onClick={toggleSidebar} className='bar' />
                        </div>
                        <div>
                            <img className='avater' src={avater} alt=""  data-bs-toggle="dropdown" />
                            <ul className="dropdown-menu nav-items text-center p-3">
                                <li><Link to="/profile" className='nav-link'>My Profile  </Link></li>
                                <button onClick={handleLogout} className='btn btn-outline-danger mt-3'>Logout</button>
                            </ul>
                        </div>

                    </div>
                    <Outlet>
                       
                    
                    </Outlet>
                    
                    <Toaster  position="top-center"  reverseOrder={false}/>

                </div>



            </section>
        
        
        
        
        </>
        
            
           
       
    );
};

export default MainLayout;