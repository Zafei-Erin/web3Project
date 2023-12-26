import { Navigate, Route, Routes } from "react-router-dom";
import Swap from "./pages/Swap";
import { Scan } from "./pages/Scan";
import Header from "./components/Header";
import { UserAccProvider } from "./context/userAddrProvider";

function App() {
  return (
    <div>
      <UserAccProvider>
        <Header />
        <Routes>
          <Route path="swap" element={<Swap />} />
          <Route path="scan" element={<Scan />} />
          <Route path="*" element={<Navigate replace to="swap" />} />
        </Routes>
      </UserAccProvider>
    </div>
  );
}

export default App;
