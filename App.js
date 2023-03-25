import SplashPage from "./screens/SplashPage";
import Login from "./screens/Login";
import Ranking from "./screens/Ranking";
import Profile from "./screens/Profile";
import Menu from "./screens/Menu";
import Register from "./screens/Register";
import addMatch from "./screens/addMatch";
import addMatch2 from "./screens/addMatch2";
import matchHistory from "./screens/matchHistory"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashPage"
          component={SplashPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
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
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="addMatch"
          component={addMatch}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="addMatch2"
          component={addMatch2}
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
