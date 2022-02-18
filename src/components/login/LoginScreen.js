import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { setName, setPassword, getToken, setToken } from "../../redux/actions";

export default function LoginScreen({ navigation }) {
  const { name, password } = useSelector((state) => state.userReducer);
  const API_URL = "https://sandbox-test7.gorilles-web-ph1.fr/api/login";
  var [token, onChangeValue] = React.useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getValueFor("token");
    if (token) navigation.navigate("Home");
  }, []);

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) navigation.navigate("Home");
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const logIn = async () => {
    if (name.length == 0 || password.length == 0) {
      Alert.alert("Champs vide");
    } else {
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            password: password,
          }),
        });
        const json = await result.json();
        if (json.token) {
          save("token", json.token);
          navigation.navigate("Home");
        } else {
          console.log("Unable to fetch gorille API");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <ImageBackground
        style={styles.background}
        opacity={0.7}
        source={require("../../../assets/img/event_bg_1.jpg")}
      >
        <Image
          source={require("../../../assets/img/Identifiez-vous.png")}
          style={styles.identify}
        />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Identifiant"
            onChangeText={(value) => dispatch(setName(value))}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de Passe"
            onChangeText={(value) => dispatch(setPassword(value))}
          />
          <View>
            <TouchableOpacity onPress={logIn} style={styles.buttons}>
              <Text style={styles.buttonText}> Connexion </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  identify: {
    marginTop: 250,
    marginHorizontal: 60,
  },
  input: {
    width: 320,
    height: 50,
    marginHorizontal: 30,
    marginVertical: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  background: {
    width: "100%",
    height: "100%",
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
});
