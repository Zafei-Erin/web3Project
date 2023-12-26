import { Link, Outlet } from "react-router-dom";
import { LightLogo } from "../assets";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  return (
    <div>
      <header className=" h-[100px] items-center flex justify-between px-12">
        <div className="flex items-center gap-5">
          <Link to={"/"}>
            <LightLogo className=" w-10 h-10 pr-5" />
          </Link>
          <Link to={"/swap"}>
            <div className=" p-2 px-4 rounded-md font-semibold items-center hover:bg-gray-100 hover:cursor-pointer">
              Swap
            </div>
          </Link>
          <Link to={"/explorer"}>
            <div className="p-2 px-4 rounded-md font-semibold items-center hover:bg-gray-100 hover:cursor-pointer">
              Explorer
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <ConnectWallet />
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
