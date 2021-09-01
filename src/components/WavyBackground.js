import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function WavyBackground({
  customStyles,
  customHeight,
  customBottom,
  customBgColor,
  customWavePattern,
}) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: customBgColor, height: customHeight }}>
        <Svg
          viewBox="0 0 540 960"
          width="540"
          height="960"
          style={{ position: "absolute", bottom: customBottom }}
        >
          <Path fill={customBgColor} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
}
