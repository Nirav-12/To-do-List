import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ToDoList from "./src/componets/ToDoList";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} />
      <ToDoList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
