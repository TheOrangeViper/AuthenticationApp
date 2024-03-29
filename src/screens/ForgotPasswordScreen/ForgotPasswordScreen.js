import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate("NewPassword");
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
        <CustomInput
          placeholder={"Email"}
          value={username}
          setvalue={setUsername}
        />
        <CustomButton text="Send" onPress={onSendPressed} type={"PRIMARY"} />
        <CustomButton
          text={"Back to Sign in"}
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

export default ForgotPasswordScreen;
