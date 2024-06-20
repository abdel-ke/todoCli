import {WEBCLIENTID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {onGoogleButtonPress} from '../auth/google_sign_in';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure({
  webClientId: WEBCLIENTID,
});
const screenWidth = Dimensions.get('window').width;

const GoogleButton = () => {
    const navigation = useNavigation<any>();

    const googleLogin = async () => {
        try {
          onGoogleButtonPress().then(() => {
            console.log('Google Login Success');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Todo' }],
              });
          });
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <TouchableOpacity style={styles.googleButton} onPress={googleLogin}>
      <Image
        style={styles.image}
        source={require('../assets/images/google.png')}
      />
      <Text>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: screenWidth - 50,
    height: 48,
    borderRadius: 10,
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  image: {
    width: 20,
    height: 20,
    margin: 5,
  },
});

export default GoogleButton;
