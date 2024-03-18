import * as React from "react"
const ChromeIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <defs>
      <linearGradient
        id="a"
        x1={3.217}
        x2={44.781}
        y1={15}
        y2={15}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#d93025" />
        <stop offset={1} stopColor="#ea4335" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={20.722}
        x2={41.504}
        y1={47.679}
        y2={11.684}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#fcc934" />
        <stop offset={1} stopColor="#fbbc04" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={26.598}
        x2={5.816}
        y1={46.502}
        y2={10.506}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#1e8e3e" />
        <stop offset={1} stopColor="#34a853" />
      </linearGradient>
    </defs>
    <circle
      cx={24}
      cy={23.995}
      r={12}
      style={{
        fill: "#fff",
      }}
    />
    <path
      d="M3.215 36A24 24 0 1 0 12 3.215 24 24 0 0 0 3.215 36Zm31.177-18A12 12 0 1 1 18 13.608 12 12 0 0 1 34.392 18Z"
      style={{
        fill: "none",
      }}
    />
    <path
      d="M24 12h20.781a23.994 23.994 0 0 0-41.564.003L13.607 30l.01-.002A11.985 11.985 0 0 1 24 12Z"
      style={{
        fill: "url(#a)",
      }}
    />
    <circle
      cx={24}
      cy={24}
      r={9.5}
      style={{
        fill: "#1a73e8",
      }}
    />
    <path
      d="M34.391 30.003 24.001 48A23.994 23.994 0 0 0 44.78 12.003H23.999l-.003.01a11.985 11.985 0 0 1 10.395 17.99Z"
      style={{
        fill: "url(#b)",
      }}
    />
    <path
      d="M13.609 30.003 3.218 12.006A23.994 23.994 0 0 0 24.003 48l10.39-17.997-.007-.007a11.985 11.985 0 0 1-20.777.007Z"
      style={{
        fill: "url(#c)",
      }}
    />
  </svg>
)
export default ChromeIcon
