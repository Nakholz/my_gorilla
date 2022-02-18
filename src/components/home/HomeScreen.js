import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Guests from "./Guests";

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useState(null);
  var item = {
    firstname: "",
    lastname: "",
    willCome: false,
  };

  useEffect(() => {
    getToken();
  }, []);

  async function deleteToken(key) {
    await SecureStore.deleteItemAsync(key);
    navigation.navigate("Login");
  }

  async function getToken() {
    let result = await SecureStore.getItemAsync("token");
    if (result) setToken(result);
  }

  if (token) {
    return (
      <View style={styles.container}>
        <Guests token={token} />
        <TouchableOpacity
          onPress={() => {
            console.log("*deleting token*");
            deleteToken("token");
          }}
          style={styles.buttons}
        >
          <Text style={styles.buttonText}> Log out </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Form", { item, token })}
          style={styles.floatButton}
        >
          <Image
            source={require("../../../assets/img/add_button.png")}
            style={styles.addButton}
          />
        </TouchableOpacity>
      </View>
    );
  } else return <ActivityIndicator size="small" color="#fffff" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000629",
  },
  buttons: {
    marginHorizontal: 30,
    marginVertical: 40,
    backgroundColor: "red",
    height: 50,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
    marginVertical: 12,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Raleway",
    color: "#ffffff",
  },
  floatButton: {
    position: "absolute",
    bottom: 150,
    right: 50,
    backgroundColor: "#000629",
    borderRadius: 75 / 2,
  },
  addButton: {
    width: 75,
    height: 75,
    overflow: "hidden",
    resizeMode: "contain",
  },
});
