import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "~/assets";

const SearchSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const search = () => {
    const address = inputRef.current?.value.trim();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    navigate(`/accounts?${address}`);
  };
  return (
    <div className="">
      <p className="font-bold text-white text-xl p-2 mb-2">
        The Ethereum Blockchain Explorer
      </p>
      <div className="flex bg-white max-w-[40rem] h-12 justify-between items-center border rounded-lg p-1.5">
        <input
          className="bg-transparent px-4 w-5/6 outline-none text-base"
          placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
          ref={inputRef}
          onKeyDown={(e) => {
            e.key === "Enter" && search();
          }}
        />

        <SearchIcon
          onClick={search}
          className="h-full object-contain rounded-lg p-2 text-gray-100 hover:bg-sky-700 bg-sky-600"
        />
      </div>
    </div>
  );
};

export default SearchSection;
