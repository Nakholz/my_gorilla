import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const URL =  "https://sandbox-test7.gorilles-web-ph1.fr/api/";

export const getRequest = (endpoint, data, token) => {
  return new Promise((resolve, reject) => {
    fetch(URL + endpoint, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((item) => {
        resolve(JSON.parse(item)[data]);
      })
      .catch((err) => {
        console.log("err on request =>", err);
        reject(err);
      })
      .done();
  });
};
