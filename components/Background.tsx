import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Svg, Rect, Filter, FeTurbulence } from "react-native-svg";

export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#B08968", "#5E503F"]} style={styles.gradient} />
      <Svg height="100%" width="100%" style={styles.noise}>
        <Filter id="noiseFilter">
          <FeTurbulence
            type="fractalNoise"
            baseFrequency="1.0"
            numOctaves="3.0"
            stitchTiles="stitch"
          />
        </Filter>
        <Rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  noise: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
  },
});
