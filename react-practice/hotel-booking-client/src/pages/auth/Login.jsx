import {useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input'
import { SiSimplelogin } from "react-icons/si";
import { login } from '../../actions/auth.js';
import { toast } from 'react-toastify';
import {useDispatch } from 'react-redux';
import { setUser } from '../../features/users/usersSlice';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here
    // console.log('Login data:', { email, password });
    try {
      const res = await login({ email, password });
      if(res.data){
        
          dispatch(setUser(res.data)); // Dispatch the user data to the Redux store
      }
      // console.log('Login response:', res.data.user);
      toast.success('Login successful! Welcome back.' + res.data.user.username); 
      navigate('/');
    } catch (error) {
      toast.error(error.response.data || 'Login failed. Please try again.'); 
      // console.error('Login error:', error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full bg-base-200 lg:px-10 px-4'>
    <div className='shadow-lg bg-base-100 rounded-lg p-6 w-full max-w-md'>
      <h1 className='text-2xl lg:text-3xl font-bold text-center mb-6'>Login</h1>
         <form onSubmit={handleSubmit} className='w-[100%] flex flex-col justify-center items-center' >
   
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
      minLength={6}
      maxLength={30}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      validator={` Must be more than 8 characters, including
At least one number At least one lowercase letter At least one uppercase letter`}
    />
    <div className='w-full px-10'>
   <button className="btn bg-red-500 hover:bg-red-600 w-full" type='submit'>
   <SiSimplelogin className='text-2xl' />
    Login
</button>
    </div>
    <div>
      <p className='text-sm text-center mt-4'>
        Don't have an account? <span onClick={() => navigate('/auth/register')} className='text-red-500 hover:underline cursor-pointer'>Register</span>
      </p>
    </div>
    </form>
    </div>
    
    </div>
  )
}

export default Login