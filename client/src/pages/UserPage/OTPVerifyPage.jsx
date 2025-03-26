import { Toaster } from 'react-hot-toast';
import OtpVerifyForm from '../../components/Users/OtpVerifyForm';
import bgImg from "../../assets/images/login-bg.png";


const OTPVerifyPage = () => {
    return (
        <section style={{backgroundImage: `url(${bgImg})`}} >
            <OtpVerifyForm />
            <Toaster  position="top-center"  reverseOrder={false}/>
           
        </section>
    );
};

export default OTPVerifyPage;