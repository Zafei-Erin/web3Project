import { Navigate, Route, Routes } from "react-router-dom";

import { UserAccProvider } from "./context/userAddrProvider";
import ExpolrerIndexPage, {
  AccountPage,
  BlockPage,
  ErrorPage,
  ExplorerHomePage,
  TxPage,
  TxnRedirectPage,
} from "./apps/Explorer";
import Swap from "./apps/Swap";
import Header from "./components/Header";

function App() {
  return (
    <div className=" bg-gray-50 min-h-screen">
      <UserAccProvider>
        <Header />
        <Routes>
          <Route path="swap" element={<Swap />} />
          <Route path="explorer/*" element={<ExpolrerIndexPage />}>
            <Route index element={<ExplorerHomePage />} />
            <Route path="account/:address" element={<AccountPage />} />
            <Route path="block/:blockId" element={<BlockPage />} />
            <Route path="tx/:txhash" element={<TxPage />} />
            {/* <Route path="txs" element={<TxnForBlockTable />} /> */}
            <Route path="txs" element={<TxnRedirectPage />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="*" element={<ExplorerHomePage />} />
          </Route>

          <Route path="*" element={<Navigate replace to="explorer" />} />
        </Routes>
      </UserAccProvider>
    </div>
  );
}

export default App;
