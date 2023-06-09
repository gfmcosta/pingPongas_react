import SplashPage from "./screens/SplashPage";
import Login from "./screens/Login";
import Ranking from "./screens/Ranking";
import Profile from "./screens/Profile";
import Menu from "./screens/Menu";
import Register from "./screens/Register";
import addMatch from "./screens/addMatch";
import addMatch3 from "./screens/addMatch3";
import matchHistory from "./screens/matchHistory"
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();



export default function App(navigation) {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ gestureEnabled: true}}>
        <Stack.Screen
          name="SplashPage"
          component={SplashPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Ranking"
          component={Ranking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false,gestureEnabled:false}}
        />
        <Stack.Screen
          name="addMatch"
          component={addMatch}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="addMatch3"
          component={addMatch3}
          options={{ headerShown: false}}
        />
         <Stack.Screen
          name="matchHistory"
          component={matchHistory}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}
