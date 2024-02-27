import { Navigate, Route, Routes } from "react-router-dom";

import { UserAccProvider } from "./context/userAddrProvider";
import ExpolrerIndexPage, {
  AccountPage,
  BlockPage,
  ExplorerHomePage,
  TxPage,
  TxnRedirectPage,
} from "./pages/Explorer";
import Swap from "./pages/Swap";

function App() {
  return (
    <div>
      <UserAccProvider>
        {/* <Header /> */}
        <Routes>
          <Route path="swap" element={<Swap />} />
          <Route path="explorer/*" element={<ExpolrerIndexPage />}>
            <Route index element={<ExplorerHomePage />} />
            <Route path="account/:address" element={<AccountPage />} />
            <Route path="block/:blockId" element={<BlockPage />} />
            <Route path="tx/:txhash" element={<TxPage />} />
            {/* <Route path="txs" element={<TxnForBlockTable />} /> */}
            <Route path="txs" element={<TxnRedirectPage />} />
            <Route path="*" element={<ExplorerHomePage />} />
          </Route>

          <Route path="*" element={<Navigate replace to="explorer" />} />
        </Routes>
      </UserAccProvider>
    </div>
  );
}

export default App;
