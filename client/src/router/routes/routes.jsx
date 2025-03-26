import { createBrowserRouter } from "react-router-dom";
import MemberListPage from "../../pages/MemberPage/MemberListPage";
import MemberPage from "../../pages/MemberPage/MemberPage";
import PackageCreatePage from "../../pages/PackagePage/PackageCreatePage";
import PackageUpdatePage from "../../pages/PackagePage/PackageUpdatePage";
import PackageListPage from "../../pages/PackagePage/PackageListPage";
import ServiceCreatePage from "../../pages/ServicePage/ServiceCreatePage";
import ServiceListPage from "../../pages/ServicePage/ServiceListPage";
import ServiceUpdatePage from "../../pages/ServicePage/ServiceUpdatePage";
import TrainerCreatePage from "../../pages/TrainerPage/TrainerCreatePage";
import TrainerListPage from "../../pages/TrainerPage/TrainerListPage";
import TrainerUpdatePage from "../../pages/TrainerPage/TrainerUpdatePage";
import MainLayout from "../../layout/MainLayout";
import MemberUpdatePage from "../../pages/MemberPage/MemberUpdatePage";
import MemberDetailsPage from './../../pages/MemberPage/MemberDetailsPage';
import CreatePaymentPage from "../../pages/MemberPage/CreatePaymentPage";
import LoginPage from "../../pages/UserPage/LoginPage";
import PasswordResetPage from "../../pages/UserPage/PasswordResetPage";
import OTPVerifyPage from "../../pages/UserPage/OTPVerifyPage";
import SetNewPasswordPage from "../../pages/UserPage/SetNewPasswordPage";
import PrivateRoute from "../privateRoute/privateRoute";
import TrainerDetailsPage from "../../pages/TrainerPage/TrainerDetailsPage";
import SalaryCreatePage from "../../pages/SalaryPages/SalaryCreatePage";
import AdvanceSalaryPage from "../../pages/SalaryPages/AdvanceSalaryPage";
import ExpenseTypePage from "../../pages/ExpensePage/ExpenseTypePage";
import CreateExpensePage from "../../pages/ExpensePage/CreateExpensePage";
import ExpenseListPage from "../../pages/ExpensePage/ExpenseListPage";
import ProfilePage from "../../pages/UserPage/ProfilePage";
import UserCreatePage from "../../pages/UserPage/UserCreatePage";
import UserListPage from "../../pages/UserPage/UserListPage";
import DashboardPage from "../../pages/DashboardPage";



const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute> <MainLayout /> </PrivateRoute>,
        children: [
            {
                path: "/",
                element: <DashboardPage />
            },
            {
                path: "/new-member",
                element:  <MemberPage />
            },
            {
                path: "/member-list",
                element: <MemberListPage />
            },
            {
                path: "/update-member/:id",
                element: <MemberUpdatePage />
            },
            {
                path: "/member-details/:id",
                element: <MemberDetailsPage />
            },
            {
                path: "/new-package",
                element: <PackageCreatePage />
            },
            {
                path: "/update-package/:id",
                element: <PackageUpdatePage />
            },
            
            {
                path: "/package-list",
                element: <PackageListPage />
            },
            {
                path: "/new-service",
                element: <ServiceCreatePage />
            },
            {
                path: "/service-list",
                element: <ServiceListPage />
            },
            {
                path: "/update-service/:id",
                element: <ServiceUpdatePage />
            },
            {
                path: "/new-trainer",
                element: <TrainerCreatePage />
            },
            {
                path: "/trainer-list",
                element: <TrainerListPage />
            },
            {
                path: "/trainer-details/:id",
                element: <TrainerDetailsPage />
            },
            {
                path: "/update-trainer/:id",
                element: <TrainerUpdatePage />
            },
            {
                path: "/new-payment/:id",
                element: <CreatePaymentPage />
            },
            {
                path: "/new-payment/:id",
                element: <CreatePaymentPage />
            },
            {
                path: "/pay-salary",
                element:  <SalaryCreatePage />
            },
            {
                path: "/advance-salary",
                element:  <AdvanceSalaryPage />
            },
            {
                path: "/expense-type",
                element:  <ExpenseTypePage />
            },
            {
                path: "/expense-create",
                element:  <CreateExpensePage />
            },
            {
                path: "/expense-list",
                element:  <ExpenseListPage />
            },
            {
                path: "/profile",
                element:  <ProfilePage />
            },
            {
                path: "/user-create",
                element:  <UserCreatePage />
            },
            {
                path: "/user-list",
                element:  <UserListPage/>
            }
                      
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },    
    {
        path: '/reset-form',
        element: <PasswordResetPage />
    },    
    {
        path: '/otp-verify-form',
        element: <OTPVerifyPage />
    },    
    {
        path: '/new-password-form',
        element: <SetNewPasswordPage />
    }

])





export default router;