import auth from '@react-native-firebase/auth';
import TodoPage from './pages/todoPage';
import SignIn from './pages/signIn';
import React from 'react';

const HomePage = (): React.JSX.Element => {
  return auth().currentUser ? <TodoPage /> : <SignIn />;
};

export default HomePage;
