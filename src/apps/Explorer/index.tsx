import { Outlet } from "react-router-dom";

const ExpolrerIndexPage = () => {
  return <Outlet />;
};

export default ExpolrerIndexPage;

export { ExplorerHomePage } from "./pages/Home";
export { BlockPage } from "./pages/BlockPage";
export { AccountPage } from "./pages/AccountPage";
export { TxPage } from "./pages/TxPage";
export { TxnRedirectPage } from "./pages/TxPage/TxnRedirectPage";
export { ErrorPage } from "./pages/ErrorPage";
