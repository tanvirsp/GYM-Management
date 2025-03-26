import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import toast from 'react-hot-toast';
import UserStore from '../../store/UserStore';

const OtpVerifyForm = () => {
    const {OtpVerifyRequest, } = UserStore();
    const nagivate = useNavigate();

    
    const [otp, setOtp] = useState()


    const handleOtp = (e)=>{
        setOtp(e.target.value);
    }

    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const result = await OtpVerifyRequest(otp);
        if(result["status"] ==="success" ){
          
            //navigate user to change password
            nagivate("/new-password-form");
        } else {
            toast.error(result.message)
        }
        
    }

    return (
        <section className='form-section '>
             <div className='form-container '>
                <input type="text" onBlur={ handleOtp }  className="form-control p-3" placeholder="Your OTP code"/>
                <input type="submit" onClick={handleSubmit} value="Verify" className="btn btn-success w-100 rounded-2 mt-2 p-3" />
                
            </div>
            
        </section>
    );
};

export default OtpVerifyForm;