import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddTask = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (route.params?.task) {
      setTitle(route.params.task.title);
      setDescription(route.params.task.description);
    }
  }, [route.params?.task]);

  const handleSaveTask = () => {
    if (title.trim() && title.length <= 50) {
      const newTask = {
        id: route.params?.task?.id || Date.now().toString(),
        title,
        description,
        completed: route.params?.task?.completed || false,
      };
      if (route.params?.task) {
        route.params.editTask(newTask);
      } else {
        route.params.addTask(newTask);
      }
      navigation.goBack();
    } else {
      alert("Title is required and must be 50 characters or less.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        maxLength={50}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />
      <Button
        title={route.params?.task ? "Save Changes" : "Add Task"}
        onPress={handleSaveTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default AddTask;
