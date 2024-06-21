import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GoogleButton from '../components/GoogleSingIn';

const SignIn = () => {
  const [email, onChangeEmail] = useState('');
  const [pass, onChangePass] = useState('');
  const navigation = useNavigation<any>();

  const signIn = async () => {
    console.log('start signIn');
    if (!email || !pass) Alert.alert('please fill your information');
    else
      try {
        await auth().signInWithEmailAndPassword(email, pass);
        navigation.reset({
          index: 0,
          routes: [{name: 'Todo'}],
        });
      } catch (error) {
        console.log('error', error);
        Alert.alert('Wrong inputs', 'email or password is incorrect');
      }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'SignUp'}],
            })
          }>
          <Text>if you dont have account, create one </Text>
          <Text style={{color: 'blue'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <GoogleButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
});

export default SignIn;
