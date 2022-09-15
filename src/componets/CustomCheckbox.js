import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const CustomCheckbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    padding: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
  },
  checkedCheckbox: {
    backgroundColor: "#000",
  },
});

export default CustomCheckbox;
