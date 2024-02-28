import { Link, Outlet } from "react-router-dom";
import { LightLogo } from "../assets";

const Header = () => {
  return (
    <div className="border-b bg-white">
      <header className="h-14 items-center flex justify-between gap-3 px-6 xl:max-w-[90%] mx-auto">
        <div className="flex items-center gap-1 py-2">
          <Link to={"/"}>
            <LightLogo className="w-6 h-6 text-sky-800 hover:text-amber-400 transition" />
          </Link>
          {/* <Link to={"/swap"}>
            <div className="rounded-md px-3 py-2 font-semibold transition items-center hover:bg-gray-100 hover:cursor-pointer">
              Swap
            </div>
          </Link> */}
          <Link to={"/explorer"}>
            <div className="text-xl font-medium text-sky-800 py-2 transition items-center hover:cursor-pointer">
              Explorer
            </div>
          </Link>
        </div>
        {/* <ConnectWallet /> */}
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
