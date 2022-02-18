import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const URL = "https://sandbox-test7.gorilles-web-ph1.fr/api/";

export const deleteRequest = (endpoint, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return new Promise((resolve, reject) => {
    fetch(URL + endpoint, requestOptions)
      .then((response) => response.text())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error))
      .done();
  });
};
