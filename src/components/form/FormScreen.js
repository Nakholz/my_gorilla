import React, { useState } from "react";
import {
  FlatList,
  View,
  CheckBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Modal,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelector, useDispatch } from "react-redux";
import { updateGuest, addGuest } from "../../redux/actions";
import { putRequest } from "../../services/putRequest";
import { postRequest } from "../../services/postRequest";

export default function FormScreen({ route, navigation }) {
  const { item } = route.params;
  const [lastname, setLastname] = useState(item.lastname);
  const [firstname, setFirstname] = useState(item.firstname);
  const [willcome, setWillcome] = useState(item.willCome);
  const dispatch = useDispatch();
  const [isNew, setNew] = useState(
    !route.params.item.firstname || !route.params.item.lastname ? true : false
  );

  function getGuest() {
    return {
      firstname: firstname,
      lastname: lastname,
      willCome: willcome,
    };
  }

  function updateGuestList() {
    putRequest("guests/" + item.id, getGuest(), route.params.token)
      .then((elem) => {
        dispatch(updateGuest(item.id, getGuest()));
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log("err =>", err);
      });
  }

  function addToGuestList() {
    postRequest("guests", getGuest(), route.params.token)
      .then((item) => {
        dispatch(addGuest(JSON.parse(item)));
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log("err =>", err);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isNew ? "Ajouter un invité" : "Modifier un invité"}
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          defaultValue={lastname}
          placeholder={"Nom"}
          onChangeText={(lastname) => setLastname(lastname)}
        />
        <TextInput
          style={styles.input}
          defaultValue={firstname}
          placeholder={"Prénom"}
          onChangeText={(firstname) => setFirstname(firstname)}
        />
        {!isNew && (
          <BouncyCheckbox
            size={50}
            fillColor="#00A36C"
            iconStyle={{ borderColor: "white" }}
            isChecked={willcome}
            text="Sera présent"
            textStyle={{
              fontFamily: "Raleway",
              textDecorationLine: "none",
              color: "white",
            }}
            style={styles.bounceCheckbox}
            onPress={() => setWillcome(!willcome)}
          />
        )}
        <View>
          <TouchableOpacity
            onPress={() => {
              isNew ? addToGuestList() : updateGuestList();
            }}
            style={styles.buttons}
          >
            <Text style={styles.buttonText}> Valider </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000629",
  },
  form: {
    marginVertical: "40%",
  },
  buttonText: {
    textAlign: "center",
    marginVertical: 12,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Raleway",
    color: "#ffffff",
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
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  bounceCheckbox: {
    marginHorizontal: 30,
    marginTop: 50,
    justifyContent: "center",
    textAlign: "center",
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
  title: {
    fontFamily: "Raleway",
    color: "#FFFFFF",
    fontSize: 25,
    width: "100%",
    textAlign: "center",
    marginTop: 50,
    marginVertical: 10,
  },
});
