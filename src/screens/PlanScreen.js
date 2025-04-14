// screens/PlanScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Button from "../components/Button";
import Background from "../components/Background";
import Header from "../components/Header";

export default function PlanScreen({ route, navigation }) {
  const { plan } = route.params;

  return (
    <Background>
      <Header>Shopping Plan</Header>
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
                  • {entry.item}: ₹{entry.cost}
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
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemLine: {
    fontSize: 16,
    marginLeft: 10,
  },
});
