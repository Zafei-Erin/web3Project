import { ReactNode, createContext, useContext, useState } from "react";

type UserAccContextType = {
  accountAddr: string;
  setAccountAddr: (prop: string) => void;
};

const UserAccContext = createContext<UserAccContextType | null>(null);

const UserAccProvider = ({ children }: { children: ReactNode }) => {
  const [accountAddr, setAccountAddr] = useState("");
  return (
    <UserAccContext.Provider value={{ accountAddr, setAccountAddr }}>
      {children}
    </UserAccContext.Provider>
  );
};

const useUserAccount = () => {
  const userAccContext = useContext(UserAccContext);

  if (!userAccContext) {
    throw new Error(
      "UserAccContext has to be used within <UserAccContext.Provider>"
    );
  }

  return userAccContext;
};

export { UserAccProvider, useUserAccount };
