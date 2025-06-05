import { StyleSheet, Text, View } from "react-native";

export default function ZoomInMessage() {
  return (
    <View style={styles.zoomInContainer} pointerEvents="none">
      <Text style={styles.zoomInText}>
        {"Zoom in to view AIS data from vessels in real time"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  zoomInContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 10,
  },
  zoomInText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});
