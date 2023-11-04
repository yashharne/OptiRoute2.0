import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import { ToastProvider } from "react-native-toast-notifications";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  MapView,
  ResetPasswordScreen,
  Dashboard,
} from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ToastProvider
      renderType={{
        custom_type: (toast) => (
          <View style={{ padding: 15, backgroundColor: "blue" }}>
            <Text>{toast.message}</Text>
          </View>
        ),
      }}
    >
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            {/* <Stack.Screen
            name="LocationPermission"
            component={LocationPermission}
          /> */}
            <Stack.Screen name="MapView" component={MapView} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
}
