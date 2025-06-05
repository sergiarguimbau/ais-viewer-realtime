import Mapbox from "@rnmapbox/maps";

import { useVesselsGeojson } from "../hooks/useVesselsGeoJson";
import type { Vessel } from "../schemas";

type VesselsMapLayerProps = {
  vessels: Vessel[];
};

export default function VesselsMapLayer(props: VesselsMapLayerProps) {
  const { vessels } = props;
  const { geojson } = useVesselsGeojson(vessels);

  return (
    <Mapbox.ShapeSource
      id="vesselsSource"
      shape={{
        type: "FeatureCollection",
        features: geojson.features,
      }}
    >
      <Mapbox.Images
        images={{ "vessel-icon": require("../../assets/vessel.png") }}
      />
      <Mapbox.SymbolLayer
        id="vesselsWithHeading"
        filter={["!=", ["get", "heading"], 511]}
        style={{
          iconImage: "vessel-icon",
          iconRotate: ["get", "heading"],
          iconAllowOverlap: true,
          iconOpacity: 0.5,
        }}
      />
      <Mapbox.CircleLayer
        id="vesselsWithoutHeading"
        filter={["==", ["get", "heading"], 511]}
        style={{
          circleRadius: 8,
          circleColor: "black",
          circleOpacity: 0.5,
        }}
      />
    </Mapbox.ShapeSource>
  );
}
