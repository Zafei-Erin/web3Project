import { useEffect } from "react";
import { useUserAccount } from "../context/userAddrProvider";

const ConnectWallet = () => {
  const { accountAddr, setAccountAddr } = useUserAccount();

  const updateAccount = (account: string[]) => {
    setAccountAddr(account[0]);
  };

  useEffect(() => {
    window.ethereum?.on("accountsChanged", updateAccount);

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateAccount);
    };
  }, []);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccountAddr(account[0]);
      } catch (error) {
        console.log("err: ", error);
      }
    } else {
      alert("Please install MetaMask first!");
    }
  };

  // const getBalance = async () => {
  //   const balance = formatBalance(
  //     await window.ethereum?.request({
  //       method: "eth_getBalance",
  //       params: [accountAddr, "latest"],
  //     })
  //   );

  //   const chainID = await window.ethereum?.request({
  //     method: "eth_chainId",
  //   });

  //   console.log(balance, chainID);
  // };

  return (
    <div>
      <button
        onClick={() => {
          if (!accountAddr) {
            connect();
          }
        }}
        className=" p-2 px-5 rounded-full font-semibold transition bg-violet-200 text-violet-600 hover:cursor-pointer hover:bg-violet-400 hover:text-white"
      >
        {accountAddr !== ""
          ? accountAddr.slice(0, 4) + "..." + accountAddr.slice(38)
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
