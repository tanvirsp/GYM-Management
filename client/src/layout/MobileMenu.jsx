
import logo from '../assets/images/logo.jpg'
import { Accordion, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi";
import { LiaPersonBoothSolid } from "react-icons/lia";
import { PiPackageLight } from "react-icons/pi";
import { GrServicePlay } from "react-icons/gr";
import { TbCoinTaka } from "react-icons/tb";
import { TfiWallet } from "react-icons/tfi";
import { GrUserAdmin } from "react-icons/gr";
import { GoDot } from "react-icons/go";
import UserStore from '../store/UserStore';
import { useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import NavItems from './NavItems';










const MobileMenu = ({showMobileMenu, toggleMobileMenu}) => {

    const {Profile ,ProfileRequest} = UserStore();
    useEffect(()=>{
        (async()=>{
            Profile === null && await ProfileRequest()


        })()
    },[])

           
    if(Profile === null){
        return <p>Loading...</p>
    }

   
    return (
        <Offcanvas show={showMobileMenu} onHide={toggleMobileMenu}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title> Heaven GYM</Offcanvas.Title>
            </Offcanvas.Header>
        
            <Offcanvas.Body>
                <nav>
                    <NavItems toggleMobileMenu={toggleMobileMenu} />
                </nav>
            

            </Offcanvas.Body>
      </Offcanvas>
   

    );
};

export default MobileMenu;