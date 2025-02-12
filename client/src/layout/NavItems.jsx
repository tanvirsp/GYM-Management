
import logo from '../assets/images/logo.jpg'
import { Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi";
import { LiaPersonBoothSolid } from "react-icons/lia";
import { PiPackageLight } from "react-icons/pi";
import { GrServicePlay } from "react-icons/gr";
import { TbCoinTaka } from "react-icons/tb";
import { RxTimer } from "react-icons/rx";
import { TfiWallet } from "react-icons/tfi";
import { GrUserAdmin } from "react-icons/gr";
import { GoDot } from "react-icons/go";









const NavItems = () => {

   
    return (
        <nav>
            <div className='text-center mt-2 mb-4'>
                <img className='logo' src={logo} alt="logo" />
            </div>
           
            <Accordion >
                <NavLink to="/" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><RxDashboard /> </span>  Dashboard</NavLink>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> <span className="sub-menu-icon"><HiOutlineUsers /> </span>   Members</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-member" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  New Member</NavLink>
                        <NavLink to="/member-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Member List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header> <span className="sub-menu-icon"><LiaPersonBoothSolid /> </span>  Trainers</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-trainer" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Trainer</NavLink>
                        <NavLink to="/trainer-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Trainer List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>  <span className="sub-menu-icon"><PiPackageLight /> </span>    Package</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-package" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Package</NavLink>
                        <NavLink to="/package-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Package List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>  <span className="sub-menu-icon"><GrServicePlay /> </span>   Services</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-service" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Service</NavLink>
                        <NavLink to="/service-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Service List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header> <span className="sub-menu-icon"><TbCoinTaka /> </span>  Payment</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-payment" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Payment</NavLink>
                        <NavLink to="/payment-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Payment List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header> <span className="sub-menu-icon"><RxTimer /> </span>  Due Payment</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-due" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Due Payment</NavLink>
                        <NavLink to="/due-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Due Payment List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header>  <span className="sub-menu-icon"><TfiWallet /> </span> Expenses</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-expense" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Expense</NavLink>
                        <NavLink to="/expense-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Payment List</NavLink>
                        <NavLink to="/new-expense" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Expense Type</NavLink>
                        <NavLink to="/expense-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Expense Type List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="7">
                    <Accordion.Header>  <span className="sub-menu-icon"><GrUserAdmin /> </span> Users</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-expense" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Users</NavLink>
                        <NavLink to="/expense-list" className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> UserList</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                

















               
            </Accordion>
  
        </nav>

    );
};

export default NavItems;