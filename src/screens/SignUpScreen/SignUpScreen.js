import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const confirmedPassword = (password, passwordRepeat) => {
    if (password == passwordRepeat) {
      return password;
    } else {
      return console.warn("Your passwords do not match");
    }
  };
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(
        email,
        confirmedPassword(password, passwordRepeat)
      )
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registerd with:" + user.email);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("ConfirmSignUp");
      }
    });
    return unsubscribe;
  });

  const onRegisterPressed = () => {
    navigation.navigate("ConfirmSignUp");
  };
  // const onSignInGooglePressed = () => {
  //   console.warn("Sign in with google pressed");
  // };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.warn("Terms of Use Pressed");
  };

  const onPrivacyPolicyPressed = () => {
    console.warn("Privacy Policy Pressed");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput placeholder={"Email"} value={email} setvalue={setEmail} />
        <CustomInput
          placeholder={"Password"}
          value={password}
          setvalue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder={"Repeat Password"}
          value={passwordRepeat}
          setvalue={setPasswordRepeat}
          secureTextEntry={true}
        />
        <CustomButton
          text="Register"
          // onPress={onRegisterPressed}
          onPress={handleSignUp}
          type={"PRIMARY"}
        />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
            Privacy Policy
          </Text>
        </Text>
        {/* <CustomButton
          text="Sign In with Google"
          onPress={onSignInGooglePressed}
          bgColor={"#FAE9EA"}
          fgColor={"#DD4D44"}
        /> */}
        <CustomButton
          text={"Already have an account? Sign in"}
          onPress={onSignInPressed}
          type={"TERTIARY"}
        />
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

export default SignUpScreen;
