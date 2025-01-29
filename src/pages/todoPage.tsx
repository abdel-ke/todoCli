import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';
import {useNavigation} from '@react-navigation/native';
import EmptyState from '../components/EmptyState';
import {
  addTodoFunc,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from '../functions/fireStore';

type Todo = {
  id: string;
  title: string;
  completed: any;
};

const heightScreen = Dimensions.get('window').height;

const TodoPage = () => {
  console.log('rendered');
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!auth().currentUser) {
      navigation.navigate('SignIn');
    } else {
      getAllTodos(setTodos);
    }
  }, [navigation]);

  const getTodos = async () => {
    try {
      getAllTodos(setTodos);
      // setTodos(data);
    } catch (error) {
      console.log(`error to get todos: ${error}`);
    }
  };

  const addTodo = async (todo: Todo) => {
    try {
      await addTodoFunc(todo);
      getTodos();
    } catch (error) {
      console.log(`error to add todo: ${error}`);
    }
  };

  const handleTodoChange = async (
    index: number,
    action: 'update' | 'delete',
    val?: boolean,
  ) => {
    try {
      if (action === 'update') {
        await updateTodo(todos[index].id.toString(), val || false);
      } else if (action === 'delete') {
        await deleteTodo(todos[index].id.toString());
      }
      getTodos();
    } catch (error) {
      console.log(`error to ${action} todo: ${error}`);
    }
  };

  useEffect(() => {
    if (!auth().currentUser) {
      navigation.navigate('SignIn');
    }
    getTodos();
  }, [navigation]);

  const renderItem = ({item, index}: {item: Todo; index: number}) => (
    <TodoItem
      item={item}
      onCheckedChange={val => handleTodoChange(index, 'update', val)}
      onDelete={() => handleTodoChange(index, 'delete')}
    />
  );

  return (
    <ImageBackground
      style={[styles.backgroungImage, {height: heightScreen / 1.8}]}
      source={require('../assets/images/bgImage.png')}>
      <View style={[styles.container, {marginTop: heightScreen / 20}]}>
        <Text style={styles.title}>Hello {auth().currentUser?.email}</Text>
        <Text style={styles.text}>What are you going to do?</Text>
        <AddTodo onPress={addTodo} />
        <Text style={[styles.text, {marginTop: 15}]}>Your To-Do List :</Text>
        {todos.length ? (
          <FlatList data={todos} renderItem={renderItem} />
        ) : (
          <EmptyState />
        )}
        <TouchableOpacity
          style={styles.signOut}
          onPress={async () => {
            await auth().signOut();
            if (!auth().currentUser) {
              navigation.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
              });
            }
          }}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 10,
    color: 'white',
  },
  backgroungImage: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    marginBottom: 20,
  },
  signOut: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});
export default TodoPage;
