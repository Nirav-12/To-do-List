import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCheckbox from "./CustomCheckbox";

const ToDoList = () => {
  const [task, setTask] = useState("");
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

  const addTask = () => {
    if (task.trim()) {
      const newTasks = [
        ...tasks,
        { id: Date.now().toString(), text: task, completed: false },
      ];
      setTasks(newTasks);
      saveTasks(newTasks);
      setTask("");
    }
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
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <CustomCheckbox
              checked={item.completed}
              onPress={() => toggleTaskCompletion(item.id)}
            />
            <Text style={[styles.task, item.completed && styles.completedTask]}>
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
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
  task: {
    fontSize: 18,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  delete: {
    color: "red",
  },
});

export default ToDoList;
