/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};

// import withMT from "@material-tailwind/react/utils/withMT";

// export default withMT({
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./src/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });
