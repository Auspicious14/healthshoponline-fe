import * as React from "react";

export const ProductIcon = (props: any) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FFF"
        fillOpacity={0.01}
        fillRule="nonzero"
        d="M24 0H0v24h24z"
      />
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M22 7 12 2 2 7v10l10 5 10-5z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m2 7 10 5m0 10V12m10-5-10 5m5-7.5-10 5"
      />
    </g>
  </svg>
);
