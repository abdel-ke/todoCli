import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {WEBCLIENTID} from '@env';
import {onGoogleButtonPress} from '../android/app/auth/google_sign_in';

GoogleSignin.configure({
  webClientId: WEBCLIENTID,
});

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Please login</Text>
        <Button
          title="Login"
          onPress={() => {
            auth()
              .signInWithEmailAndPassword('test@test.com', '123456')
              .then(() => {
                console.log('User signed in');
              })
              .catch(error => {
                console.error(error);
              });
          }}
        />
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress()
              .then(() => console.log('Signed in with Google!'))
              .catch(error => {
                console.error(error);
              })
          }
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Welcome {user.email}</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
};

export default App;
