import { assets } from '../../assets/assets'
import { Outlet} from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/appContext';

const Layout = () => {
  const {setToken, axios, navigate} = useAppContext()
  const logOut = ()=>{
    localStorage.removeItem("token")
    axios.defaults.headers.common['Authorization']=null;
    setToken(null)
    navigate("/");
  }
  return (
    <>
      <div className='flex justify-between items px-2 sm:px-10 py-4 h-[70px] border-b border-gray-300'>
        <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={()=> navigate("/")}/>

        <button onClick={logOut} className='text-sm bg-primary text-white px-8 py-2 rounded-full cursor-pointer'>Log Out</button>
      </div>

      <div className='h-[calc(100vh-70px)] flex'>
        <div>
          <Sidebar />
        </div>
          <div className='flex-1'>
            <Outlet />
          </div>
      </div>

    </>
  )
}

export default Layout