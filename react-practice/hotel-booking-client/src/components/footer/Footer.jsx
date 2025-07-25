import React from 'react'
import { Link } from 'react-router-dom'
import { TbBuildingBurjAlArab } from 'react-icons/tb'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 shadow-lg">
  <aside>
   <Link to="/" className="text-xl font-bold flex items-center"> <TbBuildingBurjAlArab className="text-3xl text-red-600" />BOOKING</Link>
    <p>
      mobinmostafa.com
      <br />
        Providing reliable tech since 2023
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
  )
}

export default Footer