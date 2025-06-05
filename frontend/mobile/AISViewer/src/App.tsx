import Mapbox from "@rnmapbox/maps";
import React, { useRef } from "react";
import { View } from "react-native";
import Config from "react-native-config";

import VesselsMap from "./components/VesselsMap";
import ZoomInMessage from "./components/ZoomInMessage";
import { INTERVAL_MS, MIN_ZOOM } from "./data/defaults";
import useVesselsPolling from "./hooks/useVesselsPolling";

Mapbox.setAccessToken(Config.MAPBOX_API_KEY);

export default function App() {
  const mapRef = useRef<Mapbox.MapView>(null);
  const vessels = useVesselsPolling(mapRef, MIN_ZOOM, INTERVAL_MS);

  return (
    <View>
      <VesselsMap mapRef={mapRef} vessels={vessels} />
      {!vessels.length && <ZoomInMessage />}
    </View>
  );
}
