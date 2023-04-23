import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetail from "./screens/UserDetail";
import UsersList from "./screens/UsersList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UsersList"
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#ff5a60" },
        }}
      >
        <Stack.Screen
          name="UsersList"
          options={{ title: "Lista de Usuarios" }}
          component={UsersList}
        />
        <Stack.Screen
          name="UserDetail"
          options={{ title: "Detalles de un usuario" }}
          component={UserDetail}
        />
        <Stack.Screen
          name="CreateUserScreen"
          options={{ title: "crear usuario" }}
          component={CreateUserScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
