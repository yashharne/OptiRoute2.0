import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header textcolor="#09bdab">OPTIROUTE</Header>
      <Header>Optimal Route Finder</Header>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
        textcolor={"#ffffff"}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
