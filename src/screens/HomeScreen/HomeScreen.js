import { useEffect, useState, useRef } from "react";
import {
  Animated,
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

import Logo from "../../../assets/AnotherLogo.png";

const HomeScreen = () => {
  const navigation = useNavigation();

  const translationX = useRef(new Animated.Value(0)).current;
  const translationY = useRef(new Animated.Value(0)).current;
  const translationScale = useRef(new Animated.Value(1)).current;
  const translationRotate = useRef(new Animated.Value(0)).current;
  const translationFade = useRef(new Animated.Value(0)).current;

  let xValue = 0;
  let yValue = 0;
  let spinValue = 0;
  let scaleValue = 0;
  let fadeValue = 0;

  const spin = translationRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const moveUp = () => {
    yValue -= 50;
    Animated.timing(translationY, {
      toValue: yValue,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };
  const moveDown = () => {
    yValue += 50;
    Animated.timing(translationY, {
      toValue: yValue,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };

  const moveRight = () => {
    xValue -= 50;
    Animated.timing(translationX, {
      toValue: xValue,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };
  const moveLeft = () => {
    xValue += 50;
    Animated.timing(translationX, {
      toValue: xValue,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };
  const rotate = () => {
    spinValue += 3;
    Animated.timing(translationRotate, {
      toValue: spinValue,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };

  const scaleUp = () => {
    scaleValue += 0.3;
    Animated.timing(translationScale, {
      toValue: scaleValue,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };

  const scaleDown = () => {
    scaleValue -= 0.3;
    Animated.timing(translationScale, {
      toValue: scaleValue,
      delay: 0,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    fadeValue = 0;
    Animated.timing(translationFade, {
      toValue: fadeValue,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn = () => {
    fadeValue = 1;
    Animated.timing(translationFade, {
      toValue: fadeValue,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Animated.timing(translationX, {
    //   toValue: 50,
    //   useNativeDriver: true,
    // }).start();
    // Animated.timing(translationY, {
    //   toValue: 50,
    //   useNativeDriver: true,
    // }).start();
    Animated.timing(translationScale, {
      toValue: 2,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.navigate("SignIn");
    });
  };

  return (
    <View style={{ flex: 3, alignContent: "center", justifyContent: "center" }}>
      <ImageBackground
        blurRadius={20}
        source={require("../../../assets/spongebob.jpg")}
        style={styles.ImageBackground}
      >
        <Animated.View
          style={{
            transform: [
              { translateX: translationX },
              { translateY: translationY },
              { rotate: spin },
              { scale: translationScale },
            ],
            opacity: translationFade,
          }}
        >
          <Image source={Logo}></Image>
        </Animated.View>
      </ImageBackground>
      <View
        style={{
          width: "100%",
          maxHeight: 150,
          backgroundColor: "black",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CustomButton
          text={"UP"}
          onPress={moveUp}
          bgColor={"red"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"DOWN"}
          onPress={moveDown}
          bgColor={"orange"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"LEFT"}
          onPress={moveRight}
          bgColor={"gray"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"RIGHT"}
          onPress={moveLeft}
          bgColor={"blue"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"360"}
          onPress={rotate}
          bgColor={"green"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"S UP"}
          onPress={scaleUp}
          bgColor={"pink"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"S DOWN"}
          onPress={scaleDown}
          bgColor={"purple"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"FADEIN"}
          onPress={fadeIn}
          bgColor={"grey"}
          maximumWidth={"20%"}
        ></CustomButton>
        <CustomButton
          text={"FADEOUT"}
          onPress={fadeOut}
          bgColor={"red"}
          maximumWidth={"20%"}
        ></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default HomeScreen;
