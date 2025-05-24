import { Link, NavLink } from "react-router-dom"
import { useState,useEffect } from "react"
import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
]
const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }, [theme]);
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
    <Link to="/" className="text-xl font-bold"> <span className="text-red-400">My</span> blog</Link>
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
  <div className="navbar-end">
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