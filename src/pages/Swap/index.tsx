import { Exchange } from "./components";

const Swap = () => {
  return (
    <div className="flex-1 flex justify-start items-center flex-col w-full mt-10">
      <div className="relative min-w-[300px] max-w-[600px] md:max-w-[700px] md:min-w-[500px] p-[2px] rounded-3xl bg-gradient-to-r from-pink-300 to-blue-300">
        <div className="w-full min-h-[400px] bg-violet-100 backdrop-blur-sm rounded-3xl shadow-card flex p-10">
          <Exchange />
          {/* {account ? (
            loading ? (
              <Loader title="Loading pools, please wait!" />
              ) : (
                <Exchange pools={pools} />
                )
                ) : (
                  <Loader title="Please connect your wallet" />
                )} */}
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 rounded-[50%] bg-pink-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-[50%] bg-blue-400 blur-3xl" />
      </div>
    </div>
  );
};

export default Swap;
