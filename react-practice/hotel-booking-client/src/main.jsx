import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NoPage from './pages/NoPage.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import store from './app/store.js';
import { Provider } from 'react-redux';
import Profile from './pages/auth/Profile.jsx';

import PrivateRoute from './features/private/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path:"auth",
        children: [
          {
            path: "login",
            element: <Login/>,
          },
          {
            path: "register",
            element: <Register/>,
          },
          {
            path: "profile",
            element: <PrivateRoute>
              <Profile />
            </PrivateRoute>,
          }
        ]
      },
      {
        path: "*",
        element: <NoPage />,
      },
    ],  
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
