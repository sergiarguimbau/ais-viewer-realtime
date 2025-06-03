import Mapbox from "@rnmapbox/maps";
import React from "react";
import { StyleSheet, View } from "react-native";
import Config from "react-native-config";

Mapbox.setAccessToken(Config.MAPBOX_API_KEY);

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mapContainer}>
        <Mapbox.MapView
          style={styles.mapView}
          styleURL={Mapbox.StyleURL.Light}
          rotateEnabled={false}
          compassEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  mapView: {
    flex: 1,
  },
});
