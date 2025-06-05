import Mapbox from "@rnmapbox/maps";
import type React from "react";
import { StyleSheet, View } from "react-native";

import type { Vessel } from "../schemas";
import VesselsMapLayer from "./VesselsMapLayer";

type VesselsMapProps = {
  mapRef: React.RefObject<Mapbox.MapView | null>;
  vessels: Vessel[];
};

export default function VesselsMap(props: VesselsMapProps) {
  const { mapRef, vessels } = props;

  return (
    <View style={styles.mapContainer}>
      <Mapbox.MapView
        ref={mapRef}
        style={styles.mapView}
        styleURL={Mapbox.StyleURL.Light}
        rotateEnabled={false}
        attributionEnabled={false}
        compassEnabled
      >
        <VesselsMapLayer vessels={vessels} />
      </Mapbox.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  mapView: {
    flex: 1,
  },
});
