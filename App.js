import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import CarteirinhaScreen from "./screens/CarteirinhaScreen";
import CadastroScreen from "./screens/CadastroScreen";
import HomePage from "./screens/HomePage"


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Pagina Inicial" options={{ headerShown: true }} component={HomePage}/>
        <Stack.Screen name="Carteirinha" options={{ headerShown: true }} component={CarteirinhaScreen} />
        <Stack.Screen name="Cadastro do Aluno" options={{ headerShown: true }} component={CadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
