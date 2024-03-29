import React from "react";

//Svg for submit icon from font awesome.

const SubmitIcon = ({ submitIcon }) => {
  return (
    <svg
      className={submitIcon}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
};

export default SubmitIcon;
