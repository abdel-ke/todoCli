import TodoPage from './pages/todoPage';
import SignIn from './pages/signIn';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './homePage';
import SignUp from './pages/signUp';
import React from 'react';

export type RootStackParamList = {
  Home: undefined;
  Todo: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Todo" component={TodoPage} />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerLeft: () => null,
            }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
