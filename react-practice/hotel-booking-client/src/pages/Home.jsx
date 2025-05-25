
import Banner from '../components/banner/Banner';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout } from '../features/users/usersSlice';

const Home = () => {
  const auth = useSelector((state) => state.users.user); // Corrected state reference
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Simulate a login action
    dispatch(setUser({ name: 'John Doe', email: '6dOg9@example.com' }));
  };

  const handleLogout = () => {
    // Simulate a logout action
    dispatch(logout());
  };

  return (
    <div>
      <Banner />
      <div>
        <div>{JSON.stringify(auth)}</div> {/* Log auth here instead */}
        <button className='btn btn-primary' onClick={handleLogin}>Login</button>
        <button className='btn btn-secondary' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
