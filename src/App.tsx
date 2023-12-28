import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import { UserAccProvider } from "./context/userAddrProvider";
import ExpolrerIndexPage from "./pages/Explorer";
import { AccountPage } from "./pages/Explorer/components/AccountPage";
import { Explorer } from "./pages/Explorer/components/Explorer";
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
            <Route path="*" element={<Explorer />} />
          </Route>

          <Route path="*" element={<Navigate replace to="swap" />} />
        </Routes>
      </UserAccProvider>
    </div>
  );
}

export default App;
