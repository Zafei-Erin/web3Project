import { useEffect } from "react";
import { useUserAccount } from "../context/userAddrProvider";

const ConnectWallet = () => {
  const { accountAddr, setAccountAddr } = useUserAccount();

  const updateAccount = (account: string[]) => {
    setAccountAddr(account[0]);
  };
  const disconnectAccount = () => {
    setAccountAddr("");
    window.location.reload();
  };
  useEffect(() => {
    window.ethereum?.on("accountsChanged", updateAccount);
    window.ethereum?.on("disconnect", disconnectAccount);

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateAccount);
      window.ethereum?.removeListener("disconnect", disconnectAccount);
    };
  }, []);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const account = await window.ethereum.request({
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

  return (
    <button
      onClick={() => {
        if (!accountAddr) {
          connect();
        }
      }}
      className="p-2 rounded-full text-nowrap font-semibold transition bg-violet-200 text-violet-600 hover:cursor-pointer hover:bg-violet-400 hover:text-white"
    >
      {accountAddr == "" || accountAddr == undefined
        ? "Connect Wallet"
        : accountAddr?.slice(0, 4) + "..." + accountAddr?.slice(38)}
    </button>
  );
};

export default ConnectWallet;
