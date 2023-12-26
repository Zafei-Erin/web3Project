import { SearchIcon } from "~/assets";

const SearchSection = () => {
  return (
    <div className="">
      <p className="font-bold text-xl p-2 mb-2">
        The Ethereum Blockchain Explorer
      </p>
      <div className="flex max-w-[40rem] h-12 justify-between items-center border rounded-lg p-1">
        <input
          className="bg-transparent px-4 w-5/6 outline-none text-lg"
          placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
        ></input>
        <SearchIcon className="h-full object-contain rounded-lg p-2 text-gray-100 hover:bg-blue-300 bg-blue-400" />
      </div>
    </div>
  );
};

export default SearchSection;
