import {useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input'
import { SiSimplelogin } from "react-icons/si";
import {useState} from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here
    // console.log('Registration data:', { username, email, password });
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      console.log("register success",res)
      toast.success('Hi ' + username + ', Registration successful! Please login.');

      navigate('auth/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
      <div className='flex flex-col items-center justify-center min-h-screen w-full bg-base-200 lg:px-10 px-4'>
    <div className='shadow-lg bg-base-100 rounded-lg p-6 w-full max-w-md'>
      <h1 className='text-2xl lg:text-3xl font-bold text-center mb-6'>Register</h1>
         <form onSubmit={handleSubmit} className='w-[100%] flex flex-col justify-center items-center' >
      {/* user input  */}
    <Input
      svg={
         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
      }
      type={"text"}
      placeholder={"Username"}
      title={"Only letters, numbers or dash"}   
      minLength={4}
      maxLength={30}
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      validator={"Must be 3 to 30 characters containing only letters, numbers or dash"}
    />
     {/* emil input  */}
    <Input
      svg={
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
      }
      type={"email"}
      placeholder={"mail@site.com"}
      validator={"Must be a valid email address"}
      title={"Must be a valid email address"}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />


     {/* password input */}
    <Input
      svg={
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
      }
      type={"password"}
      placeholder={"Password"}
      title={"Must be more than 8 characters, including number, lowercase letter, uppercase letter"}
      minLength={8}
      maxLength={30}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      validator={` Must be more than 8 characters,including
  At least one number At least one lowercase letter At least one uppercase letter`}
    />
    <div className='w-full px-10'>
   <button className="btn bg-red-500 hover:bg-red-600 w-full" type='submit'>
   <SiSimplelogin className='text-2xl' />
    Register
</button>
    </div>
    <div>
      <p className='text-sm text-center mt-4'>
        Already have an account? <span onClick={() => navigate('/auth/login')}  className='text-red-500 hover:underline cursor-pointer'>Login</span>
      </p>
    </div>
    </form>
    </div>
    
    </div>
  )
}

export default Register