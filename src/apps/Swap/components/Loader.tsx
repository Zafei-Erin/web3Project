import { IconProps } from "~/assets";

export const Loader: React.FC<IconProps> = (props) => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
        <linearGradient id="a12">
          <stop offset="0" stopColor="#2EC7FF" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#2EC7FF"></stop>
        </linearGradient>
        <circle
          fill="none"
          stroke="url(#a12)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="0 44 0 44 0 44 0 44 0 360"
          cx="100"
          cy="100"
          r="70"
          transform-origin="center"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="discrete"
            dur="1"
            values="360;324;288;252;216;180;144;108;72;36"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};
