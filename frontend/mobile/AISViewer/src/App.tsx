import Mapbox from "@rnmapbox/maps";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import Config from "react-native-config";

import SettingsManager from "./components/SettingsManager";
import VesselsMap from "./components/VesselsMap";
import ZoomInMessage from "./components/ZoomInMessage";
import { INTERVAL_MS, MIN_ZOOM } from "./data/defaults";
import useVesselsPolling from "./hooks/useVesselsPolling";
import type { Settings } from "./types";

Mapbox.setAccessToken(Config.MAPBOX_API_KEY);

// Avoids rerendering map when settings change
const VesselsMapMemo = React.memo(VesselsMap);

export default function App() {
  const mapRef = useRef<Mapbox.MapView>(null);
  const [settings, setSettings] = useState<Settings>({
    minZoom: MIN_ZOOM,
    intervalMs: INTERVAL_MS,
  });
  const vessels = useVesselsPolling(
    mapRef,
    settings.minZoom,
    settings.intervalMs
  );

  return (
    <View>
      <VesselsMapMemo mapRef={mapRef} vessels={vessels} />
      <SettingsManager settings={settings} setSettings={setSettings} />
      {vessels.length === 0 && <ZoomInMessage />}
    </View>
  );
}
