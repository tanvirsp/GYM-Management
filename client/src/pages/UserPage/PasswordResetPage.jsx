
import ResetForm from '../../components/Users/ResetForm';
import bgImg from "../../assets/images/login-bg.png";


const PasswordResetPage = () => {
    return (
        <section style={{backgroundImage: `url(${bgImg})`}} >
             <ResetForm />
        </section>
      
    );
};

export default PasswordResetPage;