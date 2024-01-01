import { IconProps } from ".";

const FromToIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="225px"
      height="225px"
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.24000000000000005"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          opacity="0.1"
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          fill="#41c38b"
        />{" "}
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#41c38b"
          strokeWidth="0.648"
        />{" "}
        <path
          d="M16 12L8 12"
          stroke="#41c38b"
          strokeWidth="0.648"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
        <path
          d="M13 15L15.913 12.087V12.087C15.961 12.039 15.961 11.961 15.913 11.913V11.913L13 9"
          stroke="#41c38b"
          strokeWidth="0.648"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
      </g>
    </svg>
  );
};

export default FromToIcon;
