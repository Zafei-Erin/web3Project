import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "~/assets";
import { cn } from "~/utils";

type Props = {
  className?: string;
};

export const SearchBar: React.FC<Props> = ({ className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const search = () => {
    const address = inputRef.current?.value.trim();
    if (!address) {
      return;
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    if (address.length === 40) {
      navigate(`/explorer/account/${address}`);
    } else if (address.length === 64) {
      navigate(`/explorer/tx/${address}`);
    } else if (!address.startsWith("0x") && !isNaN(+address)) {
      navigate(`/explorer/block/${address}`);
    } else {
      navigate(`/explorer/error`);
    }
  };
  return (
    <div
      className={cn(
        "flex bg-white max-w-[40rem] h-12 justify-between items-center border rounded-lg p-1.5 text-base",
        className
      )}
    >
      <input
        className="bg-transparent px-4 w-5/6 outline-none "
        placeholder="Search by Address / Txn Hash / Block Number"
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
  );
};
