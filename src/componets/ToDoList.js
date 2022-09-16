import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCheckbox from "./CustomCheckbox";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const ToDoList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const editTask = (updatedTask) => {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const toggleTaskCompletion = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      {tasks.length == 0 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginTop: 50,
            gap: 50,
          }}
        >
          <Text style={{ fontSize: 25, color: "gray" }}>Nothing to Show </Text>
          <FontAwesome name="list-alt" size={120} color="gray" />
        </View>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <CustomCheckbox
              checked={item.completed}
              onPress={() => toggleTaskCompletion(item.id)}
            />
            <View style={styles.taskDetails}>
              <Text
                style={[styles.task, item.completed && styles.completedTask]}
              >
                {item.title}
              </Text>
              <Text>{item.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Add Task", { task: item, editTask })
              }
            >
              <MaterialIcons
                name="edit"
                size={24}
                color="black"
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <MaterialIcons
                name="delete"
                size={24}
                color="black"
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Task", { addTask })}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  task: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  edit: {
    color: "blue",
    marginRight: 10,
  },
  delete: {
    color: "red",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default ToDoList;
