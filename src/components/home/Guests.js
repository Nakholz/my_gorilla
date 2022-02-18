import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getRequest } from "../../services/getRequest";
import { useSelector, useDispatch } from "react-redux";
import { setGuestList, deleteGuest } from "../../redux/actions";
import Guest from "./Guest";

export default function GuestsScreen({ token }) {
  const { guestList } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getRequest("guests", "hydra:member", token)
      .then((item) => {
        dispatch(setGuestList(item));
      })
      .catch((err) => {
        console.log("err =>", err);
      });
  }, []);

  if (guestList) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>Liste d'invités</Text>
        <FlatList
          data={guestList}
          renderItem={(item) => <Guest item={item.item} token={token} />}
          keyExtractor={(item) => item.id}
          extraData={guestList}
        />
      </View>
    );
  } else return <ActivityIndicator size="small" color="#fffff" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 5,
    width: 170,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    width: 170,
    height: 170,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 20,
  },
  text: {
    fontFamily: "Raleway",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  name: {
    fontSize: 25,
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginTop: 50,
    marginVertical: 10,
    fontSize: 20,
  },
});
