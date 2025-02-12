import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import HomePage from "../../pages/HomePage";

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


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/new-member",
                element: <MemberPage />
            },
            {
                path: "/member-list",
                element: <MemberListPage />
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
                path: "/update-trainer/:id",
                element: <TrainerUpdatePage />
            },
                      
        ]
    }

])





export default router;