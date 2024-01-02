import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import { UserAccProvider } from "./context/userAddrProvider";
import ExpolrerIndexPage from "./pages/Explorer";
import { AccountPage } from "./pages/Explorer/components/AccountPage";
import { BlockPage } from "./pages/Explorer/components/BlockPage";
import { Explorer } from "./pages/Explorer/components/Explorer";
import { TxPage } from "./pages/Explorer/components/TxPage";
import { TxnRedirectPage } from "./pages/Explorer/components/TxPage/TxnRedirectPage";
import Swap from "./pages/Swap";

function App() {
  return (
    <div>
      <UserAccProvider>
        <Header />
        <Routes>
          <Route path="swap" element={<Swap />} />
          <Route path="explorer/*" element={<ExpolrerIndexPage />}>
            <Route index element={<Explorer />} />
            <Route path="account/:address" element={<AccountPage />} />
            <Route path="block/:blockId" element={<BlockPage />} />
            <Route path="tx/:txhash" element={<TxPage />} />
            {/* <Route path="txs" element={<TxnForBlockTable />} /> */}
            <Route path="txs" element={<TxnRedirectPage />} />
            <Route path="*" element={<Explorer />} />
          </Route>

          <Route path="*" element={<Navigate replace to="swap" />} />
        </Routes>
      </UserAccProvider>
    </div>
  );
}

export default App;
