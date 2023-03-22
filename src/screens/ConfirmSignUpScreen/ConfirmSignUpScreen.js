import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";

const ConfirmSignUpScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  let isEmailVerified = false;

  const checkVerifcation = () => {
    isEmailVerified = user.emailVerified;
    console.log({ emailVerified: isEmailVerified });
    user.reload().then(() => {
      isEmailVerified = user.emailVerified;
      console.log({ emailVerified: isEmailVerified });
      if (isEmailVerified == false) {
        user.sendEmailVerification();
      } else {
        navigation.navigate("Home");
      }
    });
  };

  useEffect(() => {
    checkVerifcation();
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm Your Account</Text>
        <Text style={styles.text}>
          Please verify your account through your email!
        </Text>
        <CustomButton
          text="Press if you confirmed already."
          onPress={checkVerifcation}
        ></CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 35,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "grey",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default ConfirmSignUpScreen;
