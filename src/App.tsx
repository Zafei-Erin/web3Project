import { Navigate, Route, Routes } from "react-router-dom";
import Swap from "./pages/Swap";
import { Explorer } from "./pages/Explorer/Explorer";
import Header from "./components/Header";
import { UserAccProvider } from "./context/userAddrProvider";

function App() {
  return (
    <div>
      <UserAccProvider>
        <Header />
        <Routes>
          <Route path="swap" element={<Swap />} />
          <Route path="explorer" element={<Explorer />} />
          <Route path="*" element={<Navigate replace to="swap" />} />
        </Routes>
      </UserAccProvider>
    </div>
  );
}

export default App;
