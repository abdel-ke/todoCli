import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type Todo = {
  id: string;
  title: string;
  completed: any;
};

const usersCollection = firestore()
  .collection('todos')
  .doc(auth().currentUser?.uid);

const addTodoFunc = async (todo: Todo) => {
  await usersCollection.collection('todos').add({
    title: todo.title,
    completed: 0,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

const getAllTodos = async (setTodos: any) => {
  const snapshot = await usersCollection
    .collection('todos')
    .orderBy('createdAt')
    .get();
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
    completed: doc.data().completed,
  }));
  setTodos(data);
  return data;
};

// const getAllTodos = async (setTodos: any) => {
//   const unsubscribe = usersCollection
//     .collection('todos')
//     .orderBy('createdAt')
//     .onSnapshot(snapshot => {
//       // console.log('doc: ', snapshot.docs);
//       const todos = snapshot.docs.map(doc => ({
//         id: doc.id,
//         title: doc.data().title,
//         completed: doc.data().completed,
//       }));
//       setTodos(todos);
//     }, error => {
//       console.error(`Failed to fetch todos: ${error}`);
//     });

//   return unsubscribe; // Return the unsubscribe function
// };

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
