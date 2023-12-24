type BalanceProps = {
  tokenBalance: string;
};

export const Balance: React.FC<BalanceProps> = ({ tokenBalance }) => {
  return (
    <div className="w-full text-left mt-2 ml-2">
      <p className="font-poppins font-normal text-dim-white">
        <span className="font-semibold text-gray-800">Balance: </span>
        {tokenBalance}
      </p>
    </div>
  );
};
