import { Outlet } from "react-router-dom";

const ExpolrerIndexPage = () => {
  return <Outlet />;
};

export default ExpolrerIndexPage;

export { ExplorerHomePage } from "./components/Home";
export { BlockPage } from "./components/BlockPage";
export { AccountPage } from "./components/AccountPage";
export { TxPage } from "./components/TxPage";
export { TxnRedirectPage } from "./components/TxPage/TxnRedirectPage";
