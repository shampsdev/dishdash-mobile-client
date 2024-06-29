import { IconProps } from "@/features/swipes/assets/icons/icon.type";
import * as React from "react"
import Svg, { Path } from "react-native-svg"

const InfoIcon = (props: IconProps) => (
  <Svg
    fill="none"
    stroke="rgb(20, 20, 20)"
    strokeWidth={1}
    width={40}
    height={40}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </Svg>
)

export default InfoIcon;
