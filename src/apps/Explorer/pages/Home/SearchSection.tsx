import { SearchBar } from "~/components/SearchBar";

const SearchSection = () => {
  return (
    <div className="">
      <p className="font-bold text-white text-xl p-2 mb-2">
        The Ethereum Blockchain Explorer
      </p>
      <SearchBar />
    </div>
  );
};

export default SearchSection;
