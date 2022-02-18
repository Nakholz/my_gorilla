import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/components/login/LoginScreen";
import HomeScreen from "./src/components/home/HomeScreen";
import FormScreen from "./src/components/form/FormScreen";
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    Raleway: require("./assets/fonts/Raleway-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
