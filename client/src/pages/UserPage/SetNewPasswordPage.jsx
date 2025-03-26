
import { Toaster } from 'react-hot-toast';
import SetNewPasswordForm from '../../components/Users/SetNewPasswordForm';
import bgImg from "../../assets/images/login-bg.png";


const SetNewPasswordPage = () => {
    return (
        <section style={{backgroundImage: `url(${bgImg})`}} >
             <SetNewPasswordForm />
            <Toaster  position="top-center"  reverseOrder={false}/>
        </section>
    );
};

export default SetNewPasswordPage;