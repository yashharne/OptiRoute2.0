import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { TextInput, FlatList, Text, View, Linking } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import ItemListItem from "../components/ItemListItem";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";

export default function Dashboard({ navigation }) {
  const [item, setItem] = useState("");
  const [itemsList, setItemsList] = useState([]);
  // const [clearList, setClearList] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const intermediatePoints = [
    { latitude: 18.462479201186422, longitude: 73.83214922869587 }, // gaming cafe
    { latitude: 18.465359165007385, longitude: 73.83478852247687 }, // polyhub
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // let locationtext = "Waiting..";
  // if (errorMsg) {
  //   locationtext = errorMsg;
  // } else if (location) {
  //   locationtext = JSON.stringify(location);
  // }

  const addItem = () => {
    if (item.trim() !== "") {
      setItemsList([...itemsList, item]);
      setItem("");
    }
  };

  const clearItem = (itemToClear) => {
    const updatedItems = itemsList.filter((item) => item !== itemToClear);
    setItemsList(updatedItems);
  };

  const clearItems = () => {
    setItemsList([]);
    setClearList(true);
  };

  const givePathOverview = () => {
    const origin = location.coords;
    const destination = {
      // College
      latitude: 18.46313753807985,
      longitude: 73.83434475316888,
    };

    navigation.navigate("MapView", {
      origin,
      destination,
      intermediatePoints,
    });
  };

  const giveGoogleMapsPath = () => {
    const origin = location.coords;
    const destination = {
      // College
      latitude: 18.46313753807985,
      longitude: 73.83434475316888,
    };

    const originStr = `${origin.latitude},${origin.longitude}`;
    const destinationStr = `${destination.latitude},${destination.longitude}`;
    const waypointsStr = intermediatePoints
      .map((point) => `${point.latitude},${point.longitude}`)
      .join("|");

    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destinationStr}&waypoints=${waypointsStr}`;

    Linking.openURL(googleMapsURL).catch((err) =>
      console.error("An error occurred: ", err)
    );
  };

  return (
    <Background>
      {/* <Logo /> */}
      <Header>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View>
            {errorMsg ? (
              <Text>{errorMsg}</Text>
            ) : location ? (
              <View>
                <Text>Latitude: {location.coords.latitude}</Text>
                <Text>Longitude: {location.coords.longitude}</Text>
              </View>
            ) : (
              <Text>Getting location...</Text>
            )}
          </View>
          <Button
            mode="outlined"
            style={{
              width: 100,
              backgroundColor: "#dbabaf",
            }}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "StartScreen" }],
              })
            }
            textcolor={"black"}
          >
            Logout
          </Button>
        </View>
      </Header>

      <Header>Let’s start</Header>
      <Paragraph>Input items you want to shop!</Paragraph>
      <TextInput
        placeholder="Add an item"
        value={item}
        onChangeText={(text) => setItem(text)}
        onSubmitEditing={addItem}
        style={{
          backgroundColor: "#e8e3e3",
          borderRadius: 10,
          textAlign: "center",
          width: "75%",
          padding: 10,
        }}
      />

      <Button
        mode="outlined"
        bgcolor="#c9bdbd"
        textcolor={"#525050"}
        onPress={addItem}
      >
        Add Item
      </Button>

      {/* <Button mode="outlined" bgcolor="#dbd7d7" onPress={clearItems}>
        {locationtext}
      </Button> */}

      <FlatList
        data={itemsList}
        renderItem={({ item }) => (
          <ItemListItem item={item} onClearItem={clearItem} />
        )}
      />

      {/* {itemsList.length > 0 && (
        <Button mode="outlined" onPress={clearItems}>
          Clear
        </Button>
      )} */}

      {/* {clearList && <Text>List has been cleared.</Text>} */}

      <Button mode="outlined" bgcolor="#cce8dc" onPress={givePathOverview}>
        Get Path Overview
      </Button>
      <Button mode="outlined" bgcolor="#cce8dc" onPress={giveGoogleMapsPath}>
        Start Navigation
      </Button>
    </Background>
  );
}
