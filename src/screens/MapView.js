import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";

const PathMapView = ({ route }) => {
  const { origin, destination, intermediatePoints } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          // Set the initial region to center at the origin
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
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
    </SafeAreaView>
  );
};

export default PathMapView;
