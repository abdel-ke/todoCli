import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';
import {useNavigation} from '@react-navigation/native';
import EmptyState from '../components/EmptyState';
import firestore from '@react-native-firebase/firestore';
import {Icon} from '@rneui/base';

const usersCollection = firestore()
  .collection('todos')
  .doc(auth().currentUser?.uid);

type Todo = {
  id: string;
  title: any;
  completed: any;
};

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigation = useNavigation<any>();

  const handleTodoChange = async (
    index: number,
    action: 'update' | 'delete',
    val?: boolean,
  ) => {
    const todo = todos[index];
    if (action === 'update') {
      await usersCollection
        .collection('todos')
        .doc(todo.id.toString())
        .update({
          completed: val ? 1 : 0,
        });
    } else if (action === 'delete') {
      await usersCollection
        .collection('todos')
        .doc(todo.id.toString())
        .delete();
    }
    // const todo = todos[index];
    // if (action === "update") {
    //   await updateTodoAsync(todo.id, val!);
    // } else if (action === "delete") {
    //   await deleteTodoAsync(todo.id);
    // }
    // getTodos();
  };

  const getTodos = async () => {
    try {
      const snapshot = await usersCollection.collection('todos').get();
      const data = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.data().title,
          completed: doc.data().completed,
        };
      });
      setTodos(data);
    } catch (error) {
      console.log(`error to get todos: ${error}`);
    }
    // const data = await getTodosAsync();
    // setTodos(data);
  };

  useEffect(() => {
    if (!auth().currentUser) {
      //   router.replace("/signIn");
      navigation.navigate('SignIn');
    }
    getTodos();
  }, []);

  const addTodo = async (todo: Todo) => {
    try {
      await usersCollection.collection('todos').add({
        title: todo.title,
        completed: 0,
      });
      // await addTodoAsync(todo);
      getTodos();
    } catch (error) {
      console.log(`error to add todo: ${error}`);
    }
  };

  useEffect(() => {
    if (!auth().currentUser) {
      //   router.replace("/signIn");
      navigation.navigate('SignIn');
    }
    getTodos();
  }, [todos]);

  const renderItem = ({item, index}: {item: Todo; index: number}) => (
    <TodoItem
      item={item}
      onCheckedChange={val => handleTodoChange(index, 'update', val)}
      onDelete={() => handleTodoChange(index, 'delete')}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 22, marginVertical: 10}}>
        Hello {auth().currentUser?.email}
      </Text>
      <Text style={{fontWeight: '500', fontSize: 18}}>
        What are going to do?
      </Text>
      <AddTodo onPress={addTodo} />
      <Icon name="add-circle" size={30} onPress={getTodos} />
      <Text>Your To-Do List:</Text>
      {todos.length ? (
        <FlatList data={todos} renderItem={renderItem} />
      ) : (
        <EmptyState />
      )}
      <TouchableOpacity
        style={styles.signOut}
        onPress={async () => {
          await auth().signOut();
          if (!auth().currentUser)
            navigation.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            });
        }}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
  },

  signOut: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
  },
});
export default TodoPage;
