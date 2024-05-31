import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { IconProps } from "./icon.type"

export const CrossIcon = (props: IconProps) => (
  <Svg
    fill="none"
    stroke={props.color}
    strokeWidth={1.5}
    className="size-6"
    viewBox="0 0 24 24"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </Svg>
)
