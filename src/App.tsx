import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {WEBCLIENTID} from '@env';
import {onGoogleButtonPress} from './auth/google_sign_in';
import TodoPage from './pages/todoPage';
import SignIn from './pages/signIn';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './homePage';

GoogleSignin.configure({
  webClientId: WEBCLIENTID,
});

export type RootStackParamList = {
  Home: undefined;
  Todo: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen
              name="Home"
              component={HomePage}
            />
            <Stack.Screen name="Todo" component={TodoPage} />
            <Stack.Screen name="SignIn" component={SignIn} options={{
              headerLeft: () => null,
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
};
// const App = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

//   useEffect(() => {
//     auth().onAuthStateChanged(userState => {
//       setUser(userState);

//       if (loading) {
//         setLoading(false);
//       }
//     });
//   }, []);

//   if (!user) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text>Please login</Text>
//         <Button
//           title="Login"
//           onPress={() => {
//             auth()
//               .signInWithEmailAndPassword('test@test.com', '123456')
//               .then(() => {
//                 console.log('User signed in');
//               })
//               .catch(error => {
//                 console.error(error);
//               });
//           }}
//         />
//         <Button
//           title="Google Sign-In"
//           onPress={() =>
//             onGoogleButtonPress()
//               .then(() => console.log('Signed in with Google!'))
//               .catch(error => {
//                 console.error(error);
//               })
//           }
//         />
//       </View>
//     );
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>Welcome {user.email}</Text>
//       <Button title="Logout" onPress={() => auth().signOut()} />
//     </View>
//   );
// };

export default App;
