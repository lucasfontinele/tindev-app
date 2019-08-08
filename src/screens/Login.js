import React from "react";
import { KeyboardAvoidingView, View, StyleSheet, Image, Text, Platform, TouchableOpacity, TextInput } from "react-native";
import logo from "../assets/logo.png";

export default function ({ navigation }) {
  async function handleLogin() {
    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === "ios"}
      style={style.container}
    >
      <Image source={logo}/>
      <TextInput
        placeholder={"Digite o seu usuário no GitHub"}
        placeholderColor={"#999"}
        style={style.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={style.button} onPress={handleLogin}>
        <Text style={style.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5F5F5",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  inputContainer: {
    alignSelf: "stretch",
  },
  input: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    paddingHorizontal: 15,
    marginTop: 15
  },
  button: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#DF4723",
    borderRadius: 4,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
