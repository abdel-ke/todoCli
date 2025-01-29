import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUp = () => {
  const navigation = useNavigation<any>();
  const [email, onChangeEmail] = useState('');
  const [pass, onChangePass] = useState('');
  const [confPass, onChangeConfPass] = useState('');

  const creatNewUser = async (userEmail: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        userEmail,
        password,
      );
      const user = userCredential.user;
      return {
        message: 'user created',
        user: user,
      };
    } catch (error: any) {
      throw {errorCode: error.code, errorMessage: error.message};
    }
  };

  const signUp = async () => {
    if (!email || !pass || !confPass) {
      return Alert.alert('Empty inputs', 'please fill your information');
    }
    if (pass !== confPass) {
      console.log(`pass: ${pass}, confPass: ${confPass}`);
      return Alert.alert('Incorrect Password', 'Please check your password');
    }
    try {
      await creatNewUser(email, pass);
      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } catch (error: any) {
      if (error.errorCode === 'auth/email-already-in-use') {
        Alert.alert('Already exist', 'Email already in use');
      } else if (error.errorCode === 'auth/weak-password') {
        Alert.alert(
          'Weak password',
          'Password should be at least 6 characters',
        );
      } else if (error.errorCode === 'auth/invalid-email') {
        Alert.alert('Invalid email', 'The email address is badly formatted.');
      } else {
        Alert.alert(error.errorCode, error.errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeConfPass}
        placeholder="Confirm password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            })
          }>
          <Text>Already have an account! </Text>
          <Text style={{color: 'blue'}}>Sign In</Text>
        </TouchableOpacity>
      </View>
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
    borderWidth: 1,
  },
});

export default SignUp;
