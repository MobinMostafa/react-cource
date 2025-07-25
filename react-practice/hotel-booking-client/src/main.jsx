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
import Dashboard from './pages/auth/Dashboard.jsx';
import CallBack from './stripe/CallBack.jsx';
import AddNewHotel from './pages/hotels/AddNewHotel.jsx';
import HotelDetails from './pages/hotels/HotelDetails.jsx';

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
          },
          {
            path: "dashboard",
            element: <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          },
        ]
      },
      {
        path: "stripe/callback",
        element: <PrivateRoute>
          <CallBack />
        </PrivateRoute>
      },
      {
        path: "hotels",
        children: [
          {
            path: "add-new-hotel",
            element: <PrivateRoute>
              <AddNewHotel />
            </PrivateRoute>
          },
          {
            path: "hotel-details/:id",
            element: <HotelDetails /> 
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
