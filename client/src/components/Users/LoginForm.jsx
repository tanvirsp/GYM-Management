
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { VscEyeClosed } from "react-icons/vsc";
import { BiShowAlt } from "react-icons/bi";
import UserStore from '../../store/UserStore';
import logo from '../../assets/images/logo.png'


const LoginForm = () => {

    //zustand Global state
    const {LoginRequest, ProfileRequest, Loading } = UserStore();
    const navigate = useNavigate();

    const [showPassword, setShowPassowrd] = useState(false);
    const [data, setData] = useState({});

    


    const handleLoginData = (name, value)=>{
        setData({
            ...data,
            [name]:value
        })
    };


    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        const result  = await LoginRequest(data);
        if(result.status==="success"){
            toast.success("Login in successfully");
            navigate("/");
            await ProfileRequest()

        }else {
            toast.error(result.message);
        }
       

    };



    return (
        <section className='form-section'  >
            <div className='form-container'>
                <div className='login-logo'>
                    <img  src={logo} alt="logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <input onChange={ (e)=>handleLoginData("email", e.target.value) } className='form-control p-3' type="email" placeholder='Your Email'  />
                    <div className='password-field '>
                        <input onChange={ (e)=>handleLoginData("password", e.target.value) } 
                            className='form-control my-2 p-3'
                            type={showPassword ? "text" : "password"}  placeholder="Password" />
                        <span onClick={()=>setShowPassowrd(!showPassword)} className='password-icon'> {showPassword ? <BiShowAlt />   :  <VscEyeClosed />  } </span>
                    </div>

                    
                    {
                        Loading === null ? <input className='btn btn-success w-100 mt-2' type="submit" value="LOGIN" />  :
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                            <span role="status">Wait...</span>
                        </button>
                    }
                </form>
                <p className='mt-2'> <Link to="/reset-form">Forget password?</Link> </p>
                
            </div>
        </section>
    );
};

export default LoginForm;