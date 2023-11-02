import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ItemListItem = ({ item, onClearItem }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{item}</Text>
      <TouchableOpacity onPress={() => onClearItem(item)}>
        <Ionicons name="close" size={24} color="#7c7880" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row", // Display elements in the same row
    backgroundColor: "#c6b2db",
    // width: "75%",
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 25,
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

export default ItemListItem;
