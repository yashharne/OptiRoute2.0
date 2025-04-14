// screens/PlanScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Button from "../components/Button";
import Background from "../components/Background";
import Header from "../components/Header";

const screenWidth = Dimensions.get("window").width;

export default function PlanScreen({ route, navigation }) {
  const { plan } = route.params;

  return (
    <Background>
      <Header style={styles.headerContainer}>Shopping Plan</Header>
      <FlatList
        data={Object.entries(plan)}
        keyExtractor={([shop]) => shop}
        renderItem={({ item }) => {
          const [shop, items] = item;
          return (
            <View style={styles.shopBlock}>
              <Text style={styles.shopName}>{shop}</Text>
              {items.map((entry, idx) => (
                <Text key={idx} style={styles.itemLine}>
                  • {entry.item} ₹ {entry.cost}
                </Text>
              ))}
            </View>
          );
        }}
      />

      <Button
        mode="outlined"
        bgcolor="#d1c4e9"
        textcolor="#333"
        onPress={() => navigation.goBack()}
      >
        Back to Dashboard
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  shopBlock: {
    width: screenWidth * 0.8,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  shopName: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemLine: {
    fontSize: 18,
    marginLeft: 10,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 26,
    backgroundColor: "#d4d9c1",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#686e4f",
  },
});
