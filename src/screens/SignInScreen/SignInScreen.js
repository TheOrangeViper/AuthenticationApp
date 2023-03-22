import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "../../../assets/logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:" + user.email);
        if (user.emailVerified) {
          navigation.navigate("Home");
          console.log("hey");
        } else {
          navigation.navigate("ConfirmSignUp");
        }
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          navigation.navigate("Home");
          console.log("hey");
        } else {
          navigation.navigate("ConfirmSignUp");
        }
      }
    });
    return unsubscribe;
  });

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    navigation.navigate("Home");
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };
  const onSignInGooglePressed = () => {
    console.warn("Sign in with google pressed");
  };
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={(styles.logo, { height: height * 0.3 })}
          resizeMode={"contain"}
        ></Image>
        <CustomInput placeholder={"Email"} value={email} setvalue={setEmail} />
        <CustomInput
          placeholder={"Password"}
          value={password}
          setvalue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton
          text="Sign In"
          // onPress={onSignInPressed}
          onPress={handleLogin}
          type={"PRIMARY"}
        />
        <CustomButton
          text={"Forgot Password"}
          onPress={onForgotPasswordPressed}
          type={"TERTIARY"}
        />
        {/* <CustomButton
          text="Sign In with Google"
          onPress={onSignInGooglePressed}
          bgColor={"#FAE9EA"}
          fgColor={"#DD4D44"}
        /> */}
        <CustomButton
          text={"Don't have an account? Click here."}
          onPress={onSignUpPressed}
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
});

export default SignInScreen;
