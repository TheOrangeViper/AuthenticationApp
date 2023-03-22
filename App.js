import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
// import SignInScreen from "./src/screens/SignInScreen";
// import SignUpScreen from "./src/screens/SignUpScreen";
// import ConfirmSignUpScreen from "./src/screens/ConfirmSignUpScreen";
// import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
// import NewPasswordScreen from "./src/screens/NewPasswordScreen";
import Navigation from "./src/navigation";
export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FBFC",
  },
});
