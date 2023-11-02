import React from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const PathMapView = ({ origin, destination, intermediatePoints }) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker coordinate={origin} title="Origin" />
        <Marker coordinate={destination} title="Destination" />

        {/* Mark all intermediate points */}
        {intermediatePoints.map((point, index) => (
          <Marker
            key={`intermediate-${index}`}
            coordinate={point}
            title={`Intermediate Point ${index + 1}`}
          />
        ))}

        <Polyline
          coordinates={[origin, ...intermediatePoints, destination]}
          strokeWidth={3}
          strokeColor="blue"
        />
      </MapView>
    </View>
  );
};

export default PathMapView;
