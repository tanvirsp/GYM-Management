import React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
import router from './router/routes/routes.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/layout.css';
import './assets/css/loading.css';
import './assets/css/responsive.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />

)
