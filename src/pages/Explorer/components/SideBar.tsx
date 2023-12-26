const SideBar: React.FC = () => {
  return (
    <nav className="flex flex-col gap-2 items-start ml-2 border w-fit rounded-lg">
      <p className="w-full p-3 text-start font-semibold text-gray-900 hover:text-gray-500 mx-auto text-md transition">
        Home
      </p>
      <p className="w-full p-3 text-start font-semibold text-gray-900 hover:text-gray-500 mx-auto text-md transition">
        Blockchain
      </p>
      <p className="w-full p-3 text-start font-semibold text-gray-900 hover:text-gray-500 mx-auto text-md transition">
        Token
      </p>
      <p className="w-full p-3 text-start font-semibold text-gray-900 hover:text-gray-500 mx-auto text-md transition">
        NFTs
      </p>
      <p className="w-full p-3 text-start font-semibold text-gray-900 hover:text-gray-500 mx-auto text-md transition">
        Resources
      </p>
      <p className="w-full p-3 text-start font-semibold text-gray-900 hover:text-gray-500 mx-auto text-md transition">
        Developers
      </p>
      <p className="w-full p-3 text-start font-semibold text-gray-900 hover:text-gray-500 mx-auto text-md transition">
        More
      </p>
    </nav>
  );
};

export default SideBar;
