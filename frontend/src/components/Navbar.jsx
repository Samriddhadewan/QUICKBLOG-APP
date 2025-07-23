import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const {navigate,token} = useAppContext()

  return (
    <div className="flex items-center justify-between py-6 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-32 sm:w-44"
        alt=""
      />
      <button onClick={()=>navigate("/admin")} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5">
        {token? `Dashborad` : "login"}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
