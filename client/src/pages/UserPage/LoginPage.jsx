import { Toaster } from "react-hot-toast";
import bgImg from "../../assets/images/login-bg.png";


import LoginForm from "../../components/Users/LoginForm";


const LoginPage = () => {
    return (
        <section style={{backgroundImage: `url(${bgImg})`}} >
           
             <LoginForm />
            <Toaster  position="top-center"  reverseOrder={false}/>
        </section>
    );
};

export default LoginPage;