const EtherFinance = () => {
  return (
    <div className="flex divide-x-2 border rounded-lg">
      <div className="p-3">Ether Finance</div>
      <div className="flex items-center justify-center w-full">
        <div className="p-3 grid grid-cols-2 gap-3 ">
          <p className="hover: cursor-pointer transition hover:bg-blue-500 bg-blue-500/80 rounded-lg text-gray-100 flex items-center justify-center md:text-lg px-4 py-3 font-semibold">
            ERC20 TOKEN
          </p>
          <p className="hover: cursor-pointer transition hover:bg-blue-500 bg-blue-500/80 rounded-lg text-gray-100 flex items-center justify-center md:text-lg px-4 py-3 font-semibold">
            ERC21 TOKEN
          </p>
          <p className="hover: cursor-pointer transition hover:bg-blue-500 bg-blue-500/80 rounded-lg text-gray-100 flex items-center justify-center md:text-lg px-4 py-3 font-semibold">
            ERC1155 TOKEN
          </p>
          <p className="hover: cursor-pointer transition hover:bg-blue-500 bg-blue-500/80 rounded-lg text-gray-100 flex items-center justify-center md:text-lg px-4 py-3 font-semibold">
            Contract
          </p>
        </div>
      </div>
    </div>
  );
};

export default EtherFinance;
