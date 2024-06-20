import auth from '@react-native-firebase/auth';
import TodoPage from './pages/todoPage';
import SignIn from './pages/signIn';

const HomePage = () => {
    return auth().currentUser ? <TodoPage /> : <SignIn />
}

export default HomePage;