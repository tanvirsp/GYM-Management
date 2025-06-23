import { Toaster } from "react-hot-toast";


import LoginForm from "../../components/Users/LoginForm";


const LoginPage = () => {
    return (
        <section className="login-section" >
           
             <LoginForm />
            <Toaster  position="top-center"  reverseOrder={false}/>
        </section>
    );
};

export default LoginPage;