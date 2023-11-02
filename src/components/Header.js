import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function Header(props) {
  const { textcolor, ...rest } = props;
  return (
    <Text
      style={[styles.header, { color: textcolor || theme.colors.primary }]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
