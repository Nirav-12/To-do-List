import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ToDoList from "./src/componets/ToDoList";
import AddTask from "./src/componets/AddTask";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={ToDoList}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Task" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
