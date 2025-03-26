import { useState } from 'react';
import UserStore from '../../store/UserStore';
import toast from 'react-hot-toast';
import { VscEyeClosed } from "react-icons/vsc";
import { BiShowAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


const SetNewPasswordForm = () => {
    const navigate = useNavigate();

    const {ResetPasswordRequest} = UserStore();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);




    const handlePassword = (e) =>{
        setNewPassword(e.target.value);
    };


    const handleConfirmPassword = (e) =>{
        setConfirmPassword(e.target.value);
    }  
    
        
    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(newPassword === confirmPassword){
            const result = await ResetPasswordRequest(newPassword);
            if(result["status"] ==="success"){
                toast.success("Password  changed successfully");
                navigate("/")


            } else {
                toast.error(result.message);
            }
        } else {
           toast.error("Password is not same");
        }
       
    };


    return (
        <section className='form-section ' >
        <div className='form-container '>
        <form onSubmit={handleSubmit}>
            
            <label className="mt-3">New Password</label>
            <div className='password-field '>
                <input onChange={handlePassword } className='form-control p-3' type={showNewPassword ? "text" : "password"} />
                <span onClick={()=>setShowNewPassword(!showNewPassword)} className='password-icon'>  
                {showNewPassword ? <BiShowAlt /> : <VscEyeClosed />  }
                </span>
            </div>

            <label className="mt-3">Confirm New Password</label>
            <div className='password-field '>
                <input onChange={handleConfirmPassword } className='form-control p-3 ' type={showConfirmPassword ? "text" : "password"}  />
                <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className='password-icon'>  
                {showConfirmPassword ? <BiShowAlt />   :  <VscEyeClosed />  }
                </span>
            </div>
        
            <input className='btn btn-warning w-100 rounded-2 p-3 mt-3' type="submit" value="Change Password" />
        </form>
        </div>
</section>
    );
};

export default SetNewPasswordForm;