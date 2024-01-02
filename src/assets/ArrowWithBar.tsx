import { IconProps } from ".";

export const ArrowWithBar: React.FC<IconProps> = (props) => {
  const { stroke, strokeWidth, ...rest } = props;
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 4V20M12 4L8 8M12 4L16 8"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
