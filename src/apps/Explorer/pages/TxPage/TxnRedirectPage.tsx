import { useSearchParams } from "react-router-dom";
import { TxnForAccountTable } from "./TxnForAccountTable";
import { TxnForBlockTable } from "./TxnForBlockTable";

export const TxnRedirectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("a");
  const block = searchParams.get("block");

  if (address) {
    return <TxnForAccountTable />;
  }

  if (block) {
    return <TxnForBlockTable />;
  }

  return <div>Error</div>;
};
