import { Toaster } from 'react-hot-toast';
import OtpVerifyForm from '../../components/Users/OtpVerifyForm';



const OTPVerifyPage = () => {
    return (
       <section className="login-section"  >
            <OtpVerifyForm />
            <Toaster  position="top-center"  reverseOrder={false}/>
           
        </section>
    );
};

export default OTPVerifyPage;