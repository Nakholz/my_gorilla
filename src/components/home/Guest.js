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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import images from "../../../assets/img/images";
import { putRequest } from "../../services/putRequest";
import { useSelector, useDispatch } from "react-redux";
import { deleteRequest } from "../../services/deleteRequest";
import { setGuestList, deleteGuest } from "../../redux/actions";

export default function Guest({ item, token }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function getGuest() {
    return {
      firstname: item.firstname,
      lastname: item.lastname,
      willCome: !item.willCome,
    };
  }

  function dispatchDeleteGuest(id) {
    deleteRequest("guests/" + id, token)
      .then((item) => {
        console.log("delete issue =>", item);
        dispatch(deleteGuest(id));
      })
      .catch((err) => {
        console.log("err =>", err);
      });
  }

  return (
    <View key={item.id} style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Form", { item, token })}
      >
        <ImageBackground
          source={images["guest_bg_" + (item.id % 10)]}
          opacity={0.5}
          style={styles.picture}
        >
          <View style={styles.container}>
            <View style={styles.id}>
              <Text style={styles.guestId}> {item.id} </Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.text, styles.name]}>
                {item.firstname} {item.lastname}
              </Text>
            </View>
            <View style={styles.delete}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => dispatchDeleteGuest(item.id)}
              >
                <Image
                  source={require("../../../assets/img/remove.png")}
                  style={styles.remove}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.willcome}>
              <BouncyCheckbox
                size={50}
                fillColor="#00A36C"
                iconStyle={{ borderColor: "white" }}
                isChecked={item.willCome}
                onPress={() => {
                  putRequest("guests/" + item.id, getGuest(), token);
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 5,
    padding: 5,
  },
  remove: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    overflow: "hidden",
  },
  id: {
    flex: 1,
  },
  info: {
    flex: 4,
    flexDirection: "column",
  },
  delete: {
    flex: 1,
  },
  willcome: {
    flex: 1,
    margin: 5,
  },
  guestId: {
    fontFamily: "Raleway",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  picture: {
    width: 350,
    height: 140,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 15,
  },
  text: {
    fontFamily: "Raleway",
    color: "#FFFFFF",
  },
  name: {
    fontSize: 24,
  },
});
