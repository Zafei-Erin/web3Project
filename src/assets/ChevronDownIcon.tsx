import { FunctionComponent } from "react";
import { IconProps } from "./types";

export const ChevronDownIcon: FunctionComponent<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 96 960 960"
      fill="currentColor"
      {...props}
    >
      <path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" />
    </svg>
  );
};
