
import { Toaster } from 'react-hot-toast';
import SetNewPasswordForm from '../../components/Users/SetNewPasswordForm';



const SetNewPasswordPage = () => {
    return (
        <section className="login-section"  >
             <SetNewPasswordForm />
            <Toaster  position="top-center"  reverseOrder={false}/>
        </section>
    );
};

export default SetNewPasswordPage;