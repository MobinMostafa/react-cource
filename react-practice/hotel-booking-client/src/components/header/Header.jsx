import { Link, NavLink } from "react-router-dom"
import { useState,useEffect } from "react"
import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { TbBuildingBurjAlArab } from "react-icons/tb";
import { FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../features/users/usersSlice";
import Swal from "sweetalert2";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
]
const Header = () => {
    const auth = useSelector((state) => state.users.user); // Corrected state reference
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }, [theme]);

    const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "you want to logout!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Logged Out!',
            dispatch(logout()),
            'You have been logged out.',
            'success'
          )
        }
      })
     
    };
  return (
    <div className="navbar bg-base-100 shadow-sm lg:px-10 px-2 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {
        navLinks.map((link) => (
          <li key={link.name}>
            <NavLink to={link.path} className={({ isActive }) => `text-base-content hover:bg-base-200 ${isActive ? 'bg-base-200' : ''}`} >
              {link.name}
            </NavLink>
          </li>
        ))
       }

      </ul>
    </div>
<Link to="/" className="text-xl font-bold flex items-center"> <TbBuildingBurjAlArab className="text-3xl text-red-600" />BOOKING</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        {
            navLinks.map((link) => (
            <li key={link.name}>
                <NavLink to={link.path} className={({ isActive }) => `text-base-content hover:bg-base-200 ${isActive ? 'text-red-400' : ''}`} >
                {link.name}
                </NavLink>
            </li>
            ))
        }

    </ul>
  </div>
  <div className="navbar-end flex items-center gap-4">
 { !auth ? (<>
   <NavLink to="auth/register" className={({ isActive }) => `text-base-content hover:bg-base-200 flex items-center justify-center gap-1.5 ${isActive ? 'text-red-400' : ''}`} >
        <FaUser className='text-[20px lg:hidden block xl:block' /> <span className='lg:block hidden'>Register</span>
  </NavLink>
  <NavLink to="auth/login" className={({ isActive }) => `text-base-content hover:bg-base-200 flex items-center justify-center gap-1.5 ${isActive ? 'text-red-400' : ''}`} >
         <FiLogIn className='text-[20px] lg:hidden block xl:block' /> <span className="hidden lg:block">Login</span>
  </NavLink>
 </>) : ( <> 
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-field font-extrabold cursor-pointer">{auth.user.username}</div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
          <li>
            <NavLink to="auth/profile" className="text-base-content hover:bg-base-200 flex items-center gap-1.5 font-bold">
              <FaUser className='text-[20px]' /> Profile
            </NavLink>
          </li>
          <li>
          <button onClick={handleLogout} className="font-bold text-red-500 hover:bg-base-200 flex items-center justify-center gap-1.5">
            <FiLogIn className='text-[20px] ' /> <span className="">Logout</span>
          </button>
          </li>
        </ul>
      </div>
    </>
 ) }


    <a 
    className="btn"
    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
        {theme === 'light' ? <IoSunny className="text-xl" /> : <FaRegMoon className="text-xl" />}
    </a>
  </div>
</div>
  )
}

export default Header