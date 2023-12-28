import { Link, Outlet } from "react-router-dom";
import { LightLogo } from "../assets";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  return (
    <div>
      <header className=" h-16 items-center flex justify-between px-6 lg:max-w-[90%] mx-auto">
        <div className="flex items-center gap-6 py-2">
          <Link to={"/"}>
            <LightLogo className="w-6 h-6" />
          </Link>
          <Link to={"/swap"}>
            <div className="rounded-md font-semibold items-center hover:bg-gray-100 hover:cursor-pointer">
              Swap
            </div>
          </Link>
          <Link to={"/explorer"}>
            <div className="rounded-md font-semibold items-center hover:bg-gray-100 hover:cursor-pointer">
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
