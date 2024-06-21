import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const usersCollection = firestore()
  .collection('todos')
  .doc(auth().currentUser?.uid);

type Todo = {
  id: string;
  title: string;
  completed: any;
};

const addTodoFunc = async (todo: Todo) => {
  await usersCollection.collection('todos').add({
    title: todo.title,
    completed: 0,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

const getAllTodos = async () => {
    // Get all todos from the user sorted by title in ascending order
    const snapshot = await usersCollection.collection('todos').orderBy('createdAt').get();
  const data = snapshot.docs.map(doc => {
    return {
      id: doc.id,
      title: doc.data().title,
      completed: doc.data().completed,
    };
  });
  return data;
};

const updateTodo = async (id: string, completed: boolean) => {
  await usersCollection
    .collection('todos')
    .doc(id)
    .update({
      completed: completed ? 1 : 0,
    });
};

const deleteTodo = async (id: string) => {
  await usersCollection.collection('todos').doc(id).delete();
};

export {addTodoFunc, getAllTodos, updateTodo, deleteTodo};
