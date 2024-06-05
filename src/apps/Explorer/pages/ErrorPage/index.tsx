import { Link, useSearchParams } from "react-router-dom";

export const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  return (
    <div className="p-6 pt-16 pr-6 transition-all bg-white ">
      <div className="bg-[url('/src/assets/error-img.jpg')] xl:max-w-[90%] h-72  w-full mx-auto bg-contain bg-no-repeat bg-right">
        <div className="bg-white/30 h-full">
          <div className="text-sky-600 text-3xl font-medium">
            Search not found
          </div>
          <div className="py-3 text-gray-600 text-sm space-y-1 mb-6">
            <p>
              Oops! The search string you entered was:{" "}
              <span className="font-semibold">{query}</span>
            </p>
            <p>Sorry! This is an invalid search string.</p>
          </div>

          <Link to={"/"}>
            <button className="border rounded-lg px-3 py-1.5 bg-sky-600 text-white text-base">
              Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
