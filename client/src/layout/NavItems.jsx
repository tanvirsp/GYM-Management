
import logo from '../assets/images/logo.jpg'
import { Accordion } from "react-bootstrap";
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










const NavItems = ({toggleMobileMenu}) => {

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
        <Accordion >
                
        <NavLink to="/"   onClick={toggleMobileMenu}  className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><RxDashboard /> </span>  Dashboard</NavLink>
        {
            Profile.role==="member" || Profile.role==="trainer"  &&
            <NavLink to="/profile"  onClick={toggleMobileMenu}  className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><FaRegUser /> </span> My Profile</NavLink>
        }
        {
            Profile.role ==="admin" &&
            <div>
                <Accordion.Item eventKey="0">
                <Accordion.Header> <span className="sub-menu-icon"><HiOutlineUsers /> </span>   Members</Accordion.Header>
                <Accordion.Body>
                    <NavLink to="/new-member" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  New Member</NavLink>
                    <NavLink to="/member-list" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Member List</NavLink>
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header> <span className="sub-menu-icon"><LiaPersonBoothSolid /> </span>  Trainers</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-trainer" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Trainer</NavLink>
                        <NavLink to="/trainer-list" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Trainer List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>  <span className="sub-menu-icon"><PiPackageLight /> </span>    Package</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-package" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Package</NavLink>
                        <NavLink to="/package-list" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Package List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>  <span className="sub-menu-icon"><GrServicePlay /> </span>   Services</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/new-service" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> New Service</NavLink>
                        <NavLink to="/service-list"  onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>  Service List</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header> <span className="sub-menu-icon"><TbCoinTaka /> </span> Salary</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/pay-salary" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Pay Salary</NavLink>
                        <NavLink to="/advance-salary" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Advance Salary</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
            
                <Accordion.Item eventKey="6">
                    <Accordion.Header>  <span className="sub-menu-icon"><TfiWallet /> </span> Expenses</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/expense-create" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Create Expense</NavLink>
                        <NavLink to="/expense-list" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Expense List</NavLink>
                        <NavLink to="/expense-type" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Expense Type</NavLink>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="7">
                    <Accordion.Header>  <span className="sub-menu-icon"><GrUserAdmin /> </span> Users</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/profile" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> My Profile</NavLink>
                        <NavLink to="/user-create" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>Create Users</NavLink>
                        <NavLink to="/user-list" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>All Users</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                    <Accordion.Header>  <span className="sub-menu-icon"><GrUserAdmin /> </span> Report</Accordion.Header>
                    <Accordion.Body>
                        <NavLink to="/income-report" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span> Income Report</NavLink>
                        <NavLink to="/expense-report" onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>Expense Report</NavLink>
                        <NavLink to="/due-report"  onClick={toggleMobileMenu} className={({ isActive}) => isActive ? "active-nav" : "" }> <span className="sub-menu-icon"><GoDot /> </span>Due Report</NavLink>
                    </Accordion.Body>
                </Accordion.Item>
        </div>
        }

    </Accordion>

    );
};

export default NavItems;